'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { getAvailability, type AvailabilitySlot } from '@/services/booking.api';
import { format, addDays, startOfDay, endOfDay } from 'date-fns';

const BATCH_SIZE = 29;
const BATCH_DELAY = 500;
const TOTAL_DAYS = 30;
const CACHE_MAX_AGE_MS = 5 * 60 * 1000;
const POLL_INTERVAL_MS = 5000;

function getCacheKey(locationId: string, serviceVariationIds: string[]): string {
    return `avail_${locationId}_${serviceVariationIds.join(',')}`;
}

function getSlotsCacheKey(locationId: string, serviceVariationIds: string[]): string {
    return `avail_slots_${locationId}_${serviceVariationIds.join(',')}`;
}

interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

function readCache<T>(key: string): T | null {
    try {
        const stored = sessionStorage.getItem(key);
        if (!stored) return null;
        const entry: CacheEntry<T> = JSON.parse(stored);
        if (Date.now() - entry.timestamp > CACHE_MAX_AGE_MS) {
            sessionStorage.removeItem(key);
            return null;
        }
        return entry.data;
    } catch {
        return null;
    }
}

function writeCache<T>(key: string, data: T) {
    try {
        const entry: CacheEntry<T> = { data, timestamp: Date.now() };
        sessionStorage.setItem(key, JSON.stringify(entry));
    } catch { }
}

export function useAvailableDates(
    locationId: string,
    serviceVariationIds: string[]
) {
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [allSlots, setAllSlots] = useState<AvailabilitySlot[]>([]);
    const [loading, setLoading] = useState(false);
    const cancelledRef = useRef(false);
    const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const fetchIdRef = useRef(0);

    const fetchAllSlots = useCallback(() => {
        if (!locationId || serviceVariationIds.length === 0) return;

        const currentFetchId = ++fetchIdRef.current;
        const dateCacheKey = getCacheKey(locationId, serviceVariationIds);
        const slotCacheKey = getSlotsCacheKey(locationId, serviceVariationIds);

        const cachedDates = readCache<string[]>(dateCacheKey) || [];
        const cachedSlots = readCache<AvailabilitySlot[]>(slotCacheKey) || [];

        if (cachedDates.length > 0 && currentFetchId === fetchIdRef.current) setAvailableDates(cachedDates);
        if (cachedSlots.length > 0 && currentFetchId === fetchIdRef.current) setAllSlots(cachedSlots);

        if (cachedDates.length === 0 && cachedSlots.length === 0 && currentFetchId === fetchIdRef.current) {
            setLoading(true);
        }

        cancelledRef.current = false;

        const now = new Date();
        const allDates: string[] = [];
        for (let i = 0; i <= TOTAL_DAYS; i++) {
            allDates.push(format(addDays(now, i), 'yyyy-MM-dd'));
        }

        const batches: string[][] = [];
        for (let i = 0; i < allDates.length; i += BATCH_SIZE) {
            batches.push(allDates.slice(i, i + BATCH_SIZE));
        }

        const accumulatedDates: Set<string> = new Set();
        const accumulatedSlots: AvailabilitySlot[] = [];

        const fetchBatch = async (index: number) => {
            if (cancelledRef.current || index >= batches.length || currentFetchId !== fetchIdRef.current) {
                if (currentFetchId === fetchIdRef.current) setLoading(false);
                return;
            }

            try {
                const startAt = index === 0
                    ? now.toISOString()
                    : startOfDay(addDays(now, index * BATCH_SIZE)).toISOString();
                const endAt = endOfDay(addDays(now, (index + 1) * BATCH_SIZE - 1)).toISOString();

                const data = await getAvailability({
                    locationId,
                    serviceVariationIds,
                    startAt,
                    endAt,
                });

                data.slots?.forEach((s) => {
                    accumulatedDates.add(s.startAt.split('T')[0]);
                    if (!accumulatedSlots.some((existing) => existing.startAt === s.startAt)) {
                        accumulatedSlots.push(s);
                    }
                });

                if (currentFetchId === fetchIdRef.current) {
                    const sortedDates = [...accumulatedDates].sort();
                    setAvailableDates(sortedDates);
                    setAllSlots(accumulatedSlots);
                    writeCache(dateCacheKey, sortedDates);
                    writeCache(slotCacheKey, accumulatedSlots);
                }
            } catch { }

            if (index === 0 && currentFetchId === fetchIdRef.current) {
                setLoading(false);
            }

            if (!cancelledRef.current && index + 1 < batches.length && currentFetchId === fetchIdRef.current) {
                setTimeout(() => fetchBatch(index + 1), BATCH_DELAY);
            }
        };

        fetchBatch(0);
    }, [locationId, serviceVariationIds.join(',')]);

    useEffect(() => {
        fetchAllSlots();

        pollIntervalRef.current = setInterval(() => {
            fetchAllSlots();
        }, POLL_INTERVAL_MS);

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                fetchAllSlots();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            cancelledRef.current = true;
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [fetchAllSlots]);

    const getSlotsForDate = useCallback(
        (dateStr: string) => allSlots.filter((s) => s.startAt.startsWith(dateStr)),
        [allSlots]
    );
    const removeSlot = useCallback((startAt: string) => {
        setAllSlots(prev => {
            const filtered = prev.filter(s => s.startAt !== startAt);
            // Also update availableDates if this date no longer has any slots
            const dateStr = startAt.split('T')[0];
            const hasRemainingSlots = filtered.some(s => s.startAt.startsWith(dateStr));
            if (!hasRemainingSlots) {
                setAvailableDates(prevDates => prevDates.filter(d => d !== dateStr));
            }
            return filtered;
        });
    }, []);

    return { availableDates, allSlots, getSlotsForDate, loading, refetch: fetchAllSlots, removeSlot };
}