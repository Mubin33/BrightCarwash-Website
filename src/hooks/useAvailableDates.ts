"use client";

import { getAvailability, type AvailabilitySlot } from "@/services/booking.api";
import { utcDateKey, utcDayOffset } from "@/lib/bookingTime";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const BATCH_SIZE = 29;
const TOTAL_DAYS = 28;
const CACHE_MAX_AGE_MS = 5 * 60 * 1000;
const FOCUS_THROTTLE_MS = 5000;

function getCacheKey(
  locationId: string,
  serviceVariationIds: string[],
): string {
  return `avail_utc_v1_${locationId}_${serviceVariationIds.join(",")}`;
}

function getSlotsCacheKey(
  locationId: string,
  serviceVariationIds: string[],
): string {
  return `avail_utc_v1_slots_${locationId}_${serviceVariationIds.join(",")}`;
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
  } catch {}
}

export function useAvailableDates(
  locationId: string,
  serviceVariationIds: string[],
  selectedDate?: string | Date,
) {
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [allSlots, setAllSlots] = useState<AvailabilitySlot[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const cancelledRef = useRef(false);
  const fetchIdRef = useRef(0);
  const lastFetchTimeRef = useRef(0);

  const serviceVariationKey = serviceVariationIds.join(",");
  const stableVariationIds = useMemo(
    () => (serviceVariationKey ? serviceVariationKey.split(",") : []),
    [serviceVariationKey],
  );

  const selectedDateStr = selectedDate
    ? typeof selectedDate === "string"
      ? selectedDate
      : utcDateKey(selectedDate)
    : "";
  const prevDateStrRef = useRef(selectedDateStr);

  const fetchAllSlots = useCallback(() => {
    if (!locationId || stableVariationIds.length === 0) return;

    setError(null);
    const currentFetchId = ++fetchIdRef.current;
    lastFetchTimeRef.current = Date.now();
    const dateCacheKey = getCacheKey(locationId, stableVariationIds);
    const slotCacheKey = getSlotsCacheKey(locationId, stableVariationIds);

    const cachedDates = readCache<string[]>(dateCacheKey) || [];
    const cachedSlots = readCache<AvailabilitySlot[]>(slotCacheKey) || [];

    setAvailableDates(cachedDates);
    setAllSlots(cachedSlots);

    if (
      cachedDates.length === 0 &&
      cachedSlots.length === 0 &&
      currentFetchId === fetchIdRef.current
    ) {
      setLoading(true);
    }

    cancelledRef.current = false;

    const now = new Date();
    const allDates: string[] = [];
    for (let i = 0; i <= TOTAL_DAYS; i++) {
      allDates.push(utcDateKey(utcDayOffset(now, i)));
    }

    const batches: string[][] = [];
    for (let i = 0; i < allDates.length; i += BATCH_SIZE) {
      batches.push(allDates.slice(i, i + BATCH_SIZE));
    }

    const accumulatedDates: Set<string> = new Set();
    const accumulatedSlots: AvailabilitySlot[] = [];

    const fetchBatch = async (index: number) => {
      if (
        cancelledRef.current ||
        index >= batches.length ||
        currentFetchId !== fetchIdRef.current
      ) {
        if (currentFetchId === fetchIdRef.current) setLoading(false);
        return;
      }

      try {
        const startAt =
          index === 0
            ? now.toISOString()
            : utcDayOffset(now, index * BATCH_SIZE).toISOString();
        const endAt = new Date(utcDayOffset(now, (index + 1) * BATCH_SIZE).getTime() - 1).toISOString();

        const data = await getAvailability({
          locationId,
          serviceVariationIds: stableVariationIds,
          startAt,
          endAt,
        });

        if (!Array.isArray(data?.slots)) throw new Error("Invalid availability response");

        data.slots.forEach((s) => {
          accumulatedDates.add(utcDateKey(s.startAt));
          if (
            !accumulatedSlots.some((existing) => existing.startAt === s.startAt)
          ) {
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
      } catch {
        if (!cancelledRef.current && currentFetchId === fetchIdRef.current) {
          setError('We could not load appointment availability. Please try again.');
          setLoading(false);
        }
        return;
      }

      if (index === 0 && currentFetchId === fetchIdRef.current) {
        setLoading(false);
      }

      if (
        !cancelledRef.current &&
        index + 1 < batches.length &&
        currentFetchId === fetchIdRef.current
      ) {
        setTimeout(() => fetchBatch(index + 1));
      }
    };

    fetchBatch(0);
  }, [locationId, stableVariationIds]);

  // Initial fetch on mount / parameter change and re-fetch on window focus / visibility change
  useEffect(() => {
    // Synchronize loading and cached data when subscribing to this request.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAllSlots();
    const requestSequence = fetchIdRef;

    const handleFocusOrVisibility = () => {
      if (document.visibilityState === "visible") {
        const now = Date.now();
        if (now - lastFetchTimeRef.current > FOCUS_THROTTLE_MS) {
          fetchAllSlots();
        }
      }
    };

    window.addEventListener("focus", handleFocusOrVisibility);
    document.addEventListener("visibilitychange", handleFocusOrVisibility);

    return () => {
      cancelledRef.current = true;
      requestSequence.current++;
      window.removeEventListener("focus", handleFocusOrVisibility);
      document.removeEventListener("visibilitychange", handleFocusOrVisibility);
    };
  }, [fetchAllSlots]);

  // Re-fetch on date change
  useEffect(() => {
    if (prevDateStrRef.current !== selectedDateStr) {
      prevDateStrRef.current = selectedDateStr;
      if (selectedDateStr) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Refresh the external availability request for the selected date.
        fetchAllSlots();
      }
    }
  }, [selectedDateStr, fetchAllSlots]);

  const getSlotsForDate = useCallback(
    (dateStr: string) => allSlots.filter((s) => utcDateKey(s.startAt) === dateStr),
    [allSlots],
  );

  const removeSlot = useCallback((startAt: string) => {
    setAllSlots((prev) => {
      const filtered = prev.filter((s) => s.startAt !== startAt);
      // Also update availableDates if this date no longer has any slots
      const dateStr = utcDateKey(startAt);
      const hasRemainingSlots = filtered.some((s) =>
        utcDateKey(s.startAt) === dateStr,
      );
      if (!hasRemainingSlots) {
        setAvailableDates((prevDates) =>
          prevDates.filter((d) => d !== dateStr),
        );
      }
      return filtered;
    });
  }, []);

  return {
    availableDates,
    allSlots,
    getSlotsForDate,
    loading,
    error,
    refetch: fetchAllSlots,
    removeSlot,
  };
}
