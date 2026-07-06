'use client';

import { useState, useEffect } from 'react';
import { fetchNewsBySlug } from '@/services/news.api';
import { parseNewsContent } from '@/lib/news-parser';
import type { NewsDetail, NewsArticle } from '@/data/news';

function toDetail(article: NewsArticle): NewsDetail {
    const parsed = parseNewsContent(article.content);
    return {
        ...article,
        firstHalf: parsed.firstHalf,
        secondHalf: parsed.secondHalf,
        images: parsed.images
    };
}

export function useNewsDetail(slug: string) {
    const [article, setArticle] = useState<NewsDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetchNewsBySlug(slug)
            .then((newsArticle) => setArticle(toDetail(newsArticle)))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [slug]);

    return { article, loading, error };
}