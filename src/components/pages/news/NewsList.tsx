'use client';

import { useState } from 'react';
import { NewsFilters } from './NewsFilters';
import { NewsCard } from './NewsCard';
import { featuredArticle, sideArticles } from '@/data/news';
import { useTheme } from '@/contexts/ThemeContext';
import { Pagination } from '@/components/ui/Pagination';

const allArticles = [featuredArticle, ...sideArticles];

export function NewsList() {
    const [currentPage, setCurrentPage] = useState(1);
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const totalPages = 1;

    return (
        <section
            className={`flex py-20 px-4 sm:px-8 lg:px-[300px] flex-col justify-center items-center gap-12 self-stretch ${isDark ? 'bg-[#1A1A1A]' : 'bg-[#F5F5F5]'
                }`}
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