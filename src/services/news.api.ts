import { api } from "@/lib/http";
import type { NewsListResponse, NewsDetailResponse, NewsCategoriesResponse } from '@/types/news';
import { transformNewsArticle } from '@/data/news';

export async function fetchNewsList(page = 1, limit = 10, categoryId?: string) {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (categoryId) params.set('category_id', categoryId);
    const { data } = await api.get<NewsListResponse>(`/news-and-events?${params}`);
    return {
        articles: data.data.items.map(transformNewsArticle),
        meta: data.data.meta,
    };
}

export async function fetchNewsBySlug(slug: string) {
    const { data } = await api.get<NewsDetailResponse>(`/news-and-events/${encodeURIComponent(slug)}`);
    return {
        article: transformNewsArticle(data.data.item),
        related: data.data.related_items.map(transformNewsArticle),
    };
}

export async function fetchNewsCategories() {
    const { data } = await api.get<NewsCategoriesResponse>(`/news-and-events/categories`);
    return data.data;
}