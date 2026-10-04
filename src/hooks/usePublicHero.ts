"use client";

import { useState, useEffect } from 'react';
import { fetchPublicHeroSection } from '@/services/public-hero.api';
import { PublicHeroData } from '@/types/hero-public';
import { fetchCachedPublicData } from '@/lib/public-data-cache';

export function usePublicHero() {
    const [data, setData] = useState<PublicHeroData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        fetchCachedPublicData('public-hero', fetchPublicHeroSection)
            .then((result) => { if (active) setData(result || null); })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, []);

    return { data, loading };
}