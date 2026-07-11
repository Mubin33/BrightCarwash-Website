'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

interface CartSummary {
    subtotalInCents: number;
    taxInCents: number;
    totalInCents: number;
    totalDurationMinutes: number;
    currency: string;
}

export function useCartSummary(locationId: string, serviceVariationIds: string[]) {
    const [summary, setSummary] = useState<CartSummary | null>(null);

    useEffect(() => {
        if (!locationId || serviceVariationIds.length === 0) return;

        axios.post(`${API_BASE}/appointments/cart/summary`, {
            locationId,
            serviceVariationIds,
        })
            .then((res) => setSummary(res.data.data.summary))
            .catch(() => setSummary(null));
    }, [locationId, serviceVariationIds.join(',')]);

    return { summary };
}