'use client';

import { getApiFailure } from '@/lib/http-client';
import { useRef, useState } from 'react';
import { checkoutBooking } from '@/services/booking.api';
import { toast } from 'react-toastify';

export type CheckoutResult = 'success' | 'failed' | 'uncertain' | 'in-progress';

export function useCheckout() {
    const [loading, setLoading] = useState(false);
    const inFlight = useRef(false);

    const checkout = async (params: {
        locationId: string;
        startAt: string;
        lockToken: string;
        cartItems: { serviceVariationId: string; teamMemberId: string }[];
        customerName: string;
        customerEmail: string;
        customerPhone: string;
        customerNote: string;
        vehicle: string;
        nonce: string;
    }): Promise<CheckoutResult> => {
        if (inFlight.current) return 'in-progress';
        inFlight.current = true;
        setLoading(true);
        try {
            await checkoutBooking({
                ...params,
                sourceId: params.nonce,
            });
            toast.success('Booking confirmed!');
            return 'success';
        } catch (error: unknown) {
            const failure = getApiFailure(error, 'Payment failed');
            const uncertain = failure.kind !== 'http' || (failure.status ?? 0) >= 500;
            toast.error(uncertain
                ? 'We could not confirm your payment status. Please contact us to verify your booking before paying again.'
                : failure.message);
            return uncertain ? 'uncertain' : 'failed';
        } finally {
            inFlight.current = false;
            setLoading(false);
        }
    };

    return { checkout, loading };
}