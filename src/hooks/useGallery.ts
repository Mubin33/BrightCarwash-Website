'use client';

import { useState, useEffect } from 'react';
import { fetchGallery } from '@/services/gallery.api';
import type { GalleryImage } from '@/data/gallery';

export function useGallery() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchGallery()
            .then(setImages)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { images, loading, error };
}