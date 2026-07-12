import { useMemo } from 'react';
import type { AvailabilitySlot } from '@/services/booking.api';

export function useSlotGrouping(slots: AvailabilitySlot[]) {
    return useMemo(() => {
        if (process.env.NODE_ENV === 'development') {
            console.log('[DateTimeStep] Raw slots before grouping:', slots.map(s => s.startAt));
        }
        const groups: Record<string, AvailabilitySlot[]> = { Morning: [], Afternoon: [], Evening: [] };
        slots.forEach((slot) => {
            const hour = new Date(slot.startAt).getHours();
            if (hour < 12) groups.Morning.push(slot);
            else if (hour < 17) groups.Afternoon.push(slot);
            else groups.Evening.push(slot);
        });
        return groups;
    }, [slots]);
}