'use client';

import { useState, useEffect } from 'react';
import { fetchFaqs } from '@/services/faq.api';
import type { FaqItem } from '@/data/faq';

export function useFaqs() {
    const [faqs, setFaqs] = useState<FaqItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchFaqs()
            .then(setFaqs)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { faqs, loading, error };
}