import { useMemo } from 'react';
import { utcDateKey } from '@/lib/bookingTime';

export function useNextAvailableDate(date: Date | undefined, availableDates: string[]) {
    return useMemo(() => {
        if (!date || availableDates.length === 0) return null;
        const currentDateStr = utcDateKey(date);
        const index = availableDates.findIndex((d) => d > currentDateStr);
        if (index >= 0) return availableDates[index];
        return availableDates[0];
    }, [availableDates, date]);
}