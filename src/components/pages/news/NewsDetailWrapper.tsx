'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { NewsDetailContent } from './NewsDetailContent';
import { NewsDetailRelated } from './NewsDetailRelated';
import type { NewsDetail } from '@/data/news';

export function NewsDetailWrapper({ article }: { article: NewsDetail }) {
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