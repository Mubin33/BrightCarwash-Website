import type { ApiNewsArticle } from '@/types/news';
import { parseNewsContent } from '@/lib/news-parser';

export interface NewsArticle {
    id: string;
    slug: string;
    category: string;
    date: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
}

export interface NewsDetail extends NewsArticle {
    firstHalf: string;
    secondHalf: string;
    images: string[];
}

export function transformNewsArticle(api: ApiNewsArticle): NewsArticle {
    return {
        id: api.id,
        slug: api.slug,
        category: api.category?.name || '',
        date: new Date(api.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        title: api.title,
        excerpt: api.summary,
        content: api.content,
        image: api.image_url || '/images/news-1.png',
    };
}

export function transformNewsDetail(api: ApiNewsArticle): NewsDetail {
    const base = transformNewsArticle(api);
    const parsed = parseNewsContent(api.content);
    return {
        ...base,
        firstHalf: parsed.firstHalf,
        secondHalf: parsed.secondHalf,
        images: parsed.images.length > 0 ? parsed.images : ['/images/news-detail-1.png', '/images/news-detail-2.png'],
    };
}