'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { getAvailability, type AvailabilitySlot } from '@/services/booking.api';
import { format, addDays, startOfDay, endOfDay } from 'date-fns';

const BATCH_SIZE = 29;
const BATCH_DELAY = 500;
const TOTAL_DAYS = 30;
const CACHE_MAX_AGE_MS = 5 * 60 * 1000; // 5 minutes

// ---------- cache helpers ----------
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

// ---------- hook ----------
export function useAvailableDates(
    locationId: string,
    serviceVariationIds: string[]
) {
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [allSlots, setAllSlots] = useState<AvailabilitySlot[]>([]);
    const [loading, setLoading] = useState(false);
    const cancelledRef = useRef(false);

    useEffect(() => {
        if (!locationId || serviceVariationIds.length === 0) return;

        const dateCacheKey = getCacheKey(locationId, serviceVariationIds);
        const slotCacheKey = getSlotsCacheKey(locationId, serviceVariationIds);

        const cachedDates = readCache<string[]>(dateCacheKey) || [];
        const cachedSlots = readCache<AvailabilitySlot[]>(slotCacheKey) || [];

        if (cachedDates.length > 0) setAvailableDates(cachedDates);
        if (cachedSlots.length > 0) {
            const uniqueCachedSlots = cachedSlots.filter(
                (slot, index, self) => self.findIndex((s) => s.startAt === slot.startAt) === index
            );
            setAllSlots(uniqueCachedSlots);
        }

        cancelledRef.current = false;

        // Only show loading when there's absolutely no cached data
        if (cachedDates.length === 0 && cachedSlots.length === 0) {
            setLoading(true);
        }

        const now = new Date();
        const allDates: string[] = [];
        for (let i = 0; i <= TOTAL_DAYS; i++) {
            allDates.push(format(addDays(now, i), 'yyyy-MM-dd'));
        }

        const batches: string[][] = [];
        for (let i = 0; i < allDates.length; i += BATCH_SIZE) {
            batches.push(allDates.slice(i, i + BATCH_SIZE));
        }

        // Always start accumulation fresh — never seed with cached slots.
        // Cached data is shown immediately for display (setAllSlots above),
        // but the fetch pipeline builds its own clean set so stale slots
        // (e.g. old 12AM–4AM entries) are never mixed into the new results.
        const accumulatedDates: Set<string> = new Set();
        const accumulatedSlots: AvailabilitySlot[] = [];

        const fetchBatch = async (index: number) => {
            if (cancelledRef.current || index >= batches.length) {
                setLoading(false);
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

                const sortedDates = [...accumulatedDates].sort();
                setAvailableDates(sortedDates);
                setAllSlots(accumulatedSlots);
                writeCache(dateCacheKey, sortedDates);
                writeCache(slotCacheKey, accumulatedSlots);
            } catch { }

            // Stop loading after the first batch (user can see today's slots immediately)
            if (index === 0) {
                setLoading(false);
            }

            if (!cancelledRef.current && index + 1 < batches.length) {
                setTimeout(() => fetchBatch(index + 1), BATCH_DELAY);
            }
        };

        fetchBatch(0);

        return () => {
            cancelledRef.current = true;
        };
    }, [locationId, serviceVariationIds.join(',')]);

    const getSlotsForDate = useCallback(
        (dateStr: string) => allSlots.filter((s) => s.startAt.startsWith(dateStr)),
        [allSlots]
    );

    return { availableDates, allSlots, getSlotsForDate, loading };
}