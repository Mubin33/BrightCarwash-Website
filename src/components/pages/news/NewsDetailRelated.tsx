'use client';

import { NewsCard } from './NewsCard';
import type { NewsArticle } from '@/data/news';
import { useTheme } from '@/contexts/ThemeContext';

interface Props {
    articles: NewsArticle[];
}

export function NewsDetailRelated({ articles }: Props) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section
            className={`flex py-20 px-4 sm:px-8 lg:px-[300px] flex-col justify-center items-center gap-12 self-stretch border ${isDark ? 'border-white/20 bg-[#1A1A1A]' : 'border-[#DFE1E7] bg-white'
                }`}
        >
            <div className="w-full max-w-[1320px]">
                <h2
                    className={`font-bebas text-4xl font-normal leading-normal ${isDark ? 'text-white' : 'text-[#1D1F2C]'
                        }`}
                >
                    RELATED BLOGS
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1320px]">
                {articles.map((article) => (
                    <NewsCard key={article.id} article={article} />
                ))}
            </div>
        </section>
    );
}