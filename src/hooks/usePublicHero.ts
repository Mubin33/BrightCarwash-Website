"use client";

import { useState, useEffect } from 'react';
import { fetchPublicHeroSection } from '@/services/public-hero.api';
import { PublicHeroData } from '@/types/hero-public';

export function usePublicHero() {
    const [data, setData] = useState<PublicHeroData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPublicHeroSection().then((result) => {
            setData(result || null);
            setLoading(false);
        });
    }, []);

    return { data, loading };
}