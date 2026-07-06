'use client';

import { useState, useEffect } from 'react';
import { fetchLocations } from '@/services/locations.api';
import type { ApiLocation } from '@/types/locations';

export function useLocations() {
    const [locations, setLocations] = useState<ApiLocation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchLocations()
            .then(setLocations)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { locations, loading, error };
}