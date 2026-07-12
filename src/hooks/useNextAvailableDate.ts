import { useMemo } from 'react';
import { format } from 'date-fns';

export function useNextAvailableDate(date: Date | undefined, availableDates: string[]) {
    return useMemo(() => {
        if (!date || availableDates.length === 0) return null;
        const currentDateStr = format(date, 'yyyy-MM-dd');
        const index = availableDates.findIndex((d) => d > currentDateStr);
        if (index >= 0) return availableDates[index];
        return availableDates[0];
    }, [availableDates, date]);
}