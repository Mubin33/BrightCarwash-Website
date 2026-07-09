'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getAvailability } from '@/services/booking.api';
import { format, addDays, startOfDay, endOfDay } from 'date-fns';

const BATCH_SIZE = 1; // Fetch 5 days at a time
const BATCH_DELAY = 500; // 500ms gap between batches

export function useAvailableDates(
    locationId: string,
    serviceVariationIds: string[]
) {
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const batchesRef = useRef<string[][]>([]);
    const cancelledRef = useRef(false);

    useEffect(() => {
        if (!locationId || serviceVariationIds.length === 0) return;

        cancelledRef.current = false;
        setLoading(true);

        const now = new Date();
        const allDates: string[] = [];
        for (let i = 0; i <= 30; i++) {
            allDates.push(format(addDays(now, i), 'yyyy-MM-dd'));
        }

        // Split into batches
        const batches: string[][] = [];
        for (let i = 0; i < allDates.length; i += BATCH_SIZE) {
            batches.push(allDates.slice(i, i + BATCH_SIZE));
        }
        batchesRef.current = batches;

        const allResults: Set<string> = new Set();

        const fetchBatch = async (index: number) => {
            if (cancelledRef.current || index >= batches.length) return;

            const batch = batches[index];
            const startDate = batch[0];
            const endDate = batch[batch.length - 1];

            try {
                const data = await getAvailability({
                    locationId,
                    serviceVariationIds,
                    startAt: startOfDay(addDays(now, index * BATCH_SIZE)).toISOString(),
                    endAt: endOfDay(addDays(now, (index + 1) * BATCH_SIZE - 1)).toISOString(),
                });
                data.slots?.forEach((s) => allResults.add(s.startAt.split('T')[0]));

                // Update state incrementally
                setAvailableDates([...allResults].sort());
            } catch {
                // Skip failed batch
            }

            if (!cancelledRef.current && index + 1 < batches.length) {
                setTimeout(() => fetchBatch(index + 1), BATCH_DELAY);
            } else {
                setLoading(false);
            }
        };

        fetchBatch(0);

        return () => {
            cancelledRef.current = true;
        };
    }, [locationId, serviceVariationIds.join(',')]);

    return { availableDates, loading };
}