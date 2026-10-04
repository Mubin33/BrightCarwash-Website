'use client';

import { useState, useEffect } from 'react';
import { fetchNewsList, fetchNewsCategories } from '@/services/news.api';
import type { NewsArticle } from '@/data/news';
import type { ApiNewsCategory } from '@/types/news';
import { fetchCachedPublicData } from '@/lib/public-data-cache';

export function useNewsList(page = 1, limit = 10, categoryId?: string) {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [categories, setCategories] = useState<ApiNewsCategory[]>([]);
    const [meta, setMeta] = useState<{ total: number; total_pages: number } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const requestKey = JSON.stringify([page, limit, categoryId]);
    const [previousKey, setPreviousKey] = useState(requestKey);
    if (previousKey !== requestKey) {
        setPreviousKey(requestKey);
        setArticles([]); setMeta(null);
        setError(null);
        setLoading(true);
    }

    useEffect(() => {
        let active = true;
        fetchCachedPublicData('news-categories', fetchNewsCategories)
            .then((data) => { if (active) setCategories(data); })
            .catch((err) => { if (active) setError(err.message); });
        return () => { active = false; };
    }, []);

    useEffect(() => {
        let active = true;
        fetchCachedPublicData(
            `news:${JSON.stringify([page, limit, categoryId ?? null])}`,
            () => fetchNewsList(page, limit, categoryId),
        )
            .then((newsData) => {
                if (!active) return;
                setArticles(newsData.articles);
                setMeta(newsData.meta);
            })
            .catch((err) => { if (active) setError(err.message); })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [page, limit, categoryId]);

    return { articles, categories, meta, loading, error };
}