'use client';

import { useParams } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { NewsDetailContent } from './NewsDetailContent';
import { NewsDetailRelated } from './NewsDetailRelated';
import { useNewsDetail } from '@/hooks/useNewsDetail';
import { SkeletonNewsDetail } from '@/components/ui/Skeleton';
import { useTheme } from '@/contexts/ThemeContext';

export function NewsDetailWrapper() {
    const { slug } = useParams<{ slug: string }>();
    const { article, loading } = useNewsDetail(slug);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    if (loading) {
        return (
            <div className="pt-20 sm:pt-24 lg:pt-28">
                <section
                    className={`flex py-10 px-4 sm:px-6 md:px-10 lg:px-6 xl:px-40 2xl:px-75 flex-col justify-center items-center gap-12 self-stretch border ${isDark ? "border-white/20 bg-[#1A1A1A]" : "border-[#DFE1E7] bg-white"}`}
                >
                    <SkeletonNewsDetail isDark={isDark} />
                </section>
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