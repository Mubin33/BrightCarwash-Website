'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/http';

export interface CartSummary {
    subtotalInCents: number;
    taxInCents: number;
    totalInCents: number;
    totalDurationMinutes: number;
    currency: string;
}

export function useCartSummary(locationId: string, serviceVariationIds: string[]) {
    const serviceKey = JSON.stringify(serviceVariationIds);
    const [attempt, setAttempt] = useState(0);
    const requestKey = JSON.stringify([locationId, serviceKey, attempt]);
    const [result, setResult] = useState<{
        key: string; summary: CartSummary | null; error: string | null;
    } | null>(null);
    const enabled = Boolean(locationId && serviceVariationIds.length);
    const refetch = useCallback(() => setAttempt(value => value + 1), [setAttempt]);

    useEffect(() => {
        if (!enabled) return;
        let cancelled = false;
        const controller = new AbortController();
        api.post('/appointments/cart/summary', {
            locationId,
            serviceVariationIds: JSON.parse(serviceKey),
        }, { signal: controller.signal }).then(res => {
            const summary: CartSummary | undefined = res.data?.data?.summary;
            if (!summary || ![summary.subtotalInCents, summary.taxInCents, summary.totalInCents]
                .every(value => Number.isSafeInteger(value) && value >= 0)) {
                throw new Error('Invalid cart summary');
            }
            if (!cancelled) setResult({ key: requestKey, summary, error: null });
        }).catch(() => {
            if (!cancelled) setResult({ key: requestKey, summary: null,
                error: 'We could not calculate your total including tax. Please try again.' });
        });
        return () => { cancelled = true; controller.abort(); };
    }, [enabled, locationId, serviceKey, requestKey]);

    // Never expose a previous cart's totals while the current request is pending.
    const current = enabled && result?.key === requestKey ? result : null;
    return {
        summary: current?.summary ?? null,
        error: current?.error ?? null,
        loading: enabled && !current,
        refetch,
    };
}
