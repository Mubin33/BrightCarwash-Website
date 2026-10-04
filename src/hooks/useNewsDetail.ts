'use client';

import { useState, useEffect } from 'react';
import { fetchNewsBySlug } from '@/services/news.api';
import { parseNewsContent } from '@/lib/news-parser';
import type { NewsDetail, NewsArticle } from '@/data/news';
import { fetchCachedPublicData } from '@/lib/public-data-cache';

function toDetail(article: NewsArticle, related: NewsArticle[]): NewsDetail {
    const parsed = parseNewsContent(article.content);
    return {
        ...article,
        firstHalf: parsed.firstHalf,
        secondHalf: parsed.secondHalf,
        images: parsed.images,
        relatedArticles: related,
    };
}

export function useNewsDetail(slug: string) {
    const [article, setArticle] = useState<NewsDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const requestKey = slug;
    const [previousKey, setPreviousKey] = useState(requestKey);
    if (previousKey !== requestKey) {
        setPreviousKey(requestKey);
        setArticle(null);
        setError(null);
        setLoading(true);
    }

    useEffect(() => {
        let active = true;
        fetchCachedPublicData(`news-detail:${slug}`, () => fetchNewsBySlug(slug))
            .then(({ article: newsArticle, related }) =>
                active && setArticle(toDetail(newsArticle, related))
            )
            .catch((err) => { if (active) setError(err.message); })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [slug]);

    return { article, loading, error };
}