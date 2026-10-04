import type { Metadata } from 'next';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { NewsDetailWrapper } from '@/components/pages/news/NewsDetailWrapper';
import { createPageMetadata } from '@/lib/site';
import { getApiFailure } from '@/lib/http-client';
import { parseNewsContent } from '@/lib/news-parser';
import { fetchNewsBySlug } from '@/services/news.api';

// Resolve current article data at request time, including newly published slugs.
export const dynamic = 'force-dynamic';

type NewsDetailPageProps = {
    params: Promise<{ slug: string }>;
};

// Axios requests are not automatically deduplicated by Next.js fetch memoization.
const getNews = cache(async (slug: string) => {
    try {
        return await fetchNewsBySlug(slug);
    } catch (error) {
        if (getApiFailure(error).status === 404) notFound();
        throw error;
    }
});

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const { article } = await getNews(slug);
    return createPageMetadata(
        `/news/${encodeURIComponent(article.slug)}`,
        article.title,
        article.excerpt || 'Read the latest news and stories from Brightside Car Wash in Naperville.',
        article.image,
        'article',
    );
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
    const { slug } = await params;
    const { article, related } = await getNews(slug);
    const detail = {
        ...article,
        ...parseNewsContent(article.content),
        relatedArticles: related,
    };
    return <NewsDetailWrapper article={detail} />;
}
