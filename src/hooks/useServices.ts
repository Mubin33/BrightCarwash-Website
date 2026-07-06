'use client';

import { useState, useEffect } from 'react';
import { fetchServices } from '@/services/services.api';
import type { ServiceData } from '@/data/services';

export function useServices(locationId?: string) {
    const [services, setServices] = useState<ServiceData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices(locationId)
            .then(setServices)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [locationId]);

    return { services, loading };
}