'use client';

import { useState, useEffect } from 'react';
import { fetchServices } from '@/services/services.api';
import type { ServiceData } from '@/data/services';
import { fetchCachedPublicData } from '@/lib/public-data-cache';

export function useServices(locationId?: string) {
    const [services, setServices] = useState<ServiceData[]>([]);
    const [loading, setLoading] = useState(Boolean(locationId));
    const [error, setError] = useState<string | null>(null);
    const requestKey = locationId;
    const [previousKey, setPreviousKey] = useState(requestKey);
    if (previousKey !== requestKey) {
        setPreviousKey(requestKey);
        setServices([]);
        setError(null);
        setLoading(Boolean(locationId));
    }

    useEffect(() => {
        if (!locationId) return;
        let active = true;
        fetchCachedPublicData(`services:${locationId}`, () => fetchServices(locationId))
            .then((data) => active && setServices(data.map(s => ({ ...s, locationId }))))
            .catch((err) => { if (active) setError(err.message); })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [locationId]);

    return { services, loading, error };
}