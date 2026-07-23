"use client";

import { useState, useEffect } from 'react';
import { fetchPublicHeroSection } from '@/services/public-hero.api';
import { PublicHeroData } from '@/types/hero-public';

const defaultData: PublicHeroData = {
    eyebrow_text: 'Veteran-Owned | Naperville, IL | EST. 2025',
    main_headline: 'YOUR CAR DESERVES A BRIGHTER STANDARD.',
    subtext: 'Book online in 60 seconds. Pay a small deposit to lock in your spot — and we\'ll handle the rest.',
    star_rating: '4.9',
    cars_washed: '12K+',
    avg_time: '15-Min Average',
    status: 'form',
    text_alignment: 'left',
};

export function usePublicHero() {
    const [data, setData] = useState<PublicHeroData>(defaultData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPublicHeroSection().then((result) => {
            if (result) setData(result);
            setLoading(false);
        });
    }, []);

    return { data, loading };
}