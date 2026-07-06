'use client';

import { useState, useEffect } from 'react';
import { fetchTestimonials } from '@/services/testimonials.api';
import type { TestimonialData } from '@/data/testimonials';

export function useTestimonials(page = 1, limit = 10) {
    const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetchTestimonials(page, limit)
            .then(setTestimonials)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [page, limit]);

    return { testimonials, loading, error };
}