'use client';

import { useState, useEffect } from 'react';
import { getAvailability, type AvailabilitySlot } from '@/services/booking.api';
import { format } from 'date-fns';

export function useAvailability(
    locationId: string,
    serviceVariationIds: string[],
    date: Date | undefined
) {
    const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!date || serviceVariationIds.length === 0) {
            setSlots([]);
            return;
        }

        const dateStr = format(date, 'yyyy-MM-dd');
        const startAt = `${dateStr}T00:00:00Z`;
        const endAt = `${dateStr}T23:59:59Z`;

        setLoading(true);
        getAvailability({
            locationId,
            serviceVariationIds,
            startAt,
            endAt,
        })
            .then((data) => setSlots(data.slots || []))
            .catch(() => setSlots([]))
            .finally(() => setLoading(false));
    }, [locationId, serviceVariationIds.join(','), date?.toISOString().split('T')[0]]);

    return { slots, loading };
}