'use client';

import { useState } from 'react';
import { NewsFilters } from './NewsFilters';
import { NewsCard } from './NewsCard';
import { useTheme } from '@/contexts/ThemeContext';
import { Pagination } from '@/components/ui/Pagination';
import { useNewsList } from '@/hooks/useNewsList';

export function NewsList() {
    const [currentPage, setCurrentPage] = useState(1);
    const { articles, loading } = useNewsList(currentPage, 6);
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const totalPages = 1;
    const allArticles = articles;

    if (loading) {
        return (
            <section className={`flex py-20 px-4 sm:px-8 lg:px-[300px] flex-col justify-center items-center gap-12 self-stretch ${isDark ? 'bg-[#1A1A1A]' : 'bg-[#F5F5F5]'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[1320px]">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-[500px] bg-gray-100 animate-pulse rounded-lg" />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section
            className={`flex py-20 px-4 sm:px-6 md:px-10 lg:px-6 xl:px-40 2xl:px-[300px] flex-col justify-center items-center gap-12 self-stretch ${isDark ? 'bg-[#1A1A1A]' : 'bg-[#F5F5F5]'}`}
        >
            <NewsFilters />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1320px]">
                {allArticles.map((article) => (
                    <NewsCard key={article.id} article={article} />
                ))}
            </div>
            <div className="w-full max-w-[1320px]">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
        </section>
    );
}