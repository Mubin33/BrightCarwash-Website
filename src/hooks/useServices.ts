'use client';

import { useState, useEffect } from 'react';
import { fetchServices } from '@/services/services.api';
import type { ServiceData } from '@/data/services';

export function useServices(locationId?: string) {
    const [services, setServices] = useState<ServiceData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!locationId) {
            setServices([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        fetchServices(locationId)
            .then((data) => setServices(data.map(s => ({ ...s, locationId }))))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [locationId]);

    return { services, loading, error };
}