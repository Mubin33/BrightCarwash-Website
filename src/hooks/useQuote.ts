'use client';

import { useState } from 'react';
import { submitQuote } from '@/services/quote.api';
import { toast } from 'react-toastify';

export function useQuote() {
    const [loading, setLoading] = useState(false);

    const sendQuote = async (params: { full_name: string; email: string; phone: string; vehicle_type: string }) => {
        setLoading(true);
        try {
            await submitQuote(params);
            toast.success('Quote request submitted successfully!');
            return true;
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to submit quote');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { sendQuote, loading };
}