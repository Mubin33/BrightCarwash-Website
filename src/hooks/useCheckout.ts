'use client';

import { useState } from 'react';
import { checkoutBooking } from '@/services/booking.api';
import { toast } from 'react-toastify';

export function useCheckout() {
    const [loading, setLoading] = useState(false);

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
    }) => {
        setLoading(true);
        try {
            await checkoutBooking({ ...params, sourceId: 'cnon:card-nonce-ok' });
            toast.success('Booking confirmed!');
            return true;
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Payment failed');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { checkout, loading };
}