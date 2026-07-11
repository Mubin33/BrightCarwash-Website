'use client';

import { useState, useCallback } from 'react';
import { lockSlot, releaseLock } from '@/services/booking.api';
import { toast } from 'react-toastify';
import { getCartId } from '@/lib/cart-id';

export function useBookingLock() {
    const [lockToken, setLockToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const lock = useCallback(async (locationId: string, startAt: string, serviceVariationIds: string[]) => {
        setLoading(true);
        try {
            const result = await lockSlot({
                locationId,
                startAt,
                serviceVariationIds,
                cartId: getCartId(),
            });
            setLockToken(result.lockToken);
            return result;
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to lock slot');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const release = useCallback(async (locationId: string, startAt: string) => {
        if (!lockToken) return;
        try {
            await releaseLock({ locationId, startAt, lockToken });
            setLockToken(null);
        } catch {
            // silent
        }
    }, [lockToken]);

    return { lockToken, lock, release, loading };
}