'use client';

import { useParams } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { NewsDetailContent } from './NewsDetailContent';
import { NewsDetailRelated } from './NewsDetailRelated';
import { useNewsDetail } from '@/hooks/useNewsDetail';

export function NewsDetailWrapper() {
    const { slug } = useParams<{ slug: string }>();
    const { article, loading } = useNewsDetail(slug);

    if (loading) {
        return (
            <div className="pt-20 sm:pt-24 lg:pt-28">
                <div className="h-112.5 bg-gray-100 animate-pulse rounded-lg mx-4 sm:mx-8 lg:mx-75" />
            </div>
        );
    }

    if (!article) {
        return (
            <div className="pt-20 sm:pt-24 lg:pt-28 text-center py-20">
                <p className="text-[#777980] font-inter">Article not found</p>
            </div>
        );
    }

    return (
        <div >
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'News & Events', href: '/news' },
                    { label: article.title, href: `/news/${article.slug}` },
                ]}
            />
            <NewsDetailContent article={article} />
            {article.relatedArticles.length > 0 && (
                <NewsDetailRelated articles={article.relatedArticles} />
            )}
        </div>
    );
}