'use client';

import { useState, useEffect } from 'react';
import { fetchTestimonials } from '@/services/testimonials.api';
import type { TestimonialData } from '@/data/testimonials';
import { fetchCachedPublicData } from '@/lib/public-data-cache';

export function useTestimonials(page = 1, limit = 10) {
    const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const requestKey = JSON.stringify([page, limit]);
    const [previousKey, setPreviousKey] = useState(requestKey);
    if (previousKey !== requestKey) {
        setPreviousKey(requestKey);
        setTestimonials([]);
        setError(null);
        setLoading(true);
    }

    useEffect(() => {
        let active = true;
        fetchCachedPublicData(`testimonials:${page}:${limit}`, () => fetchTestimonials(page, limit))
            .then(data => { if (active) setTestimonials(data); })
            .catch((err) => { if (active) setError(err.message); })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [page, limit]);

    return { testimonials, loading, error };
}