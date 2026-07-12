'use client';

import { useState, useCallback } from 'react';
import { lockSlot, releaseLock } from '@/services/booking.api';
import { toast } from 'react-toastify';
import { getCartId } from '@/lib/cart-id';
import { useBooking } from '@/contexts/BookingContext';

export function useBookingLock() {
    const { lockToken, setLockToken } = useBooking();
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
            if (error.response?.status === 409) {
                return { alreadyLocked: true };
            }
            toast.error(error.response?.data?.message || 'Failed to lock slot');
            return null;
        } finally {
            setLoading(false);
        }
    }, [setLockToken]);

    const release = useCallback(async (locationId: string, startAt: string) => {
        if (!lockToken) return;
        try {
            await releaseLock({ locationId, startAt, lockToken });
            setLockToken(null);
        } catch {
            // silent
        }
    }, [lockToken, setLockToken]);

    return { lockToken, lock, release, loading };
}