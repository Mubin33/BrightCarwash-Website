import axios from 'axios';
import type { NewsListResponse, NewsDetailResponse, NewsCategoriesResponse } from '@/types/news';
import { transformNewsArticle } from '@/data/news';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchNewsList(page = 1, limit = 10, categoryId?: string) {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (categoryId) params.set('category_id', categoryId);
    const { data } = await axios.get<NewsListResponse>(`${API_BASE}/news-and-events?${params}`);
    return {
        articles: data.data.items.map(transformNewsArticle),
        meta: data.data.meta,
    };
}

export async function fetchNewsBySlug(slug: string) {
    const { data } = await axios.get<NewsDetailResponse>(`${API_BASE}/news-and-events/${slug}`);
    return transformNewsArticle(data.data);
}

export async function fetchNewsCategories() {
    const { data } = await axios.get<NewsCategoriesResponse>(`${API_BASE}/news-and-events/categories`);
    return data.data;
}