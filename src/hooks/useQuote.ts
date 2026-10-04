'use client';

import { getApiFailure } from '@/lib/http-client';
import { useState } from 'react';
import { submitQuote } from '@/services/quote.api';
import { toast } from 'react-toastify';

export function useQuote() {
    const [loading, setLoading] = useState(false);

    const sendQuote = async (params: {
        full_name: string;
        email: string;
        phone: string;
        vehicle_type: string;
        date?: string; // ✅ Add date as optional string
    }) => {
        setLoading(true);
        try {
            await submitQuote(params);
            toast.success('Quote request submitted successfully!');
            return true;
        } catch (error: unknown) {
            const failure = getApiFailure(error, 'Failed to submit quote');
            toast.error(failure.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { sendQuote, loading };
}