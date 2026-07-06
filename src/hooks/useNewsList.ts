'use client';

import { useState, useEffect } from 'react';
import { fetchNewsList, fetchNewsCategories } from '@/services/news.api';
import type { NewsArticle } from '@/data/news';
import type { ApiNewsCategory } from '@/types/news';

export function useNewsList(page = 1, limit = 10, categoryId?: string) {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [categories, setCategories] = useState<ApiNewsCategory[]>([]);
    const [meta, setMeta] = useState<{ total: number; total_pages: number } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            fetchNewsList(page, limit, categoryId),
            fetchNewsCategories(),
        ])
            .then(([newsData, cats]) => {
                setArticles(newsData.articles);
                setMeta(newsData.meta);
                setCategories(cats);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [page, limit, categoryId]);

    return { articles, categories, meta, loading, error };
}