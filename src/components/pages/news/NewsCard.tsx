'use client';

import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import type { NewsArticle } from '@/data/news';
import Link from 'next/link';

interface Props {
    article: NewsArticle;
    loading?: boolean;
}

export function NewsCard({ article, loading = false }: Props) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    console.log('NewsCard image:', article.image);

    if (loading) {
        return (
            <div
                className={`h-full flex flex-col items-start gap-4 self-stretch rounded-xl border ${isDark ? 'border-white/20 bg-white/[0.06]' : 'border-[#ECEFF3] bg-white'
                    }`}
            >
                <div className={`h-[246px] self-stretch rounded-t-xl animate-pulse ${isDark ? 'bg-[#2A2A2A]' : 'bg-gray-200'}`} />
                <div className="flex flex-col items-start gap-3 p-4 pt-0 w-full">
                    <div className="flex items-center gap-2 w-full">
                        <div className={`h-4 w-20 rounded animate-pulse ${isDark ? 'bg-[#2A2A2A]' : 'bg-gray-200'}`} />
                        <div className={`h-4 w-24 rounded animate-pulse ${isDark ? 'bg-[#2A2A2A]' : 'bg-gray-200'}`} />
                    </div>
                    <div className={`h-7 w-full rounded animate-pulse ${isDark ? 'bg-[#2A2A2A]' : 'bg-gray-200'}`} />
                    <div className={`h-4 w-full rounded animate-pulse ${isDark ? 'bg-[#2A2A2A]' : 'bg-gray-200'}`} />
                    <div className={`h-4 w-3/4 rounded animate-pulse ${isDark ? 'bg-[#2A2A2A]' : 'bg-gray-200'}`} />
                </div>
            </div>
        );
    }

    return (
        <Link href={`/news/${article.slug}`} className='self-strech'>
            <div
                className={`h-full flex flex-col  items-start gap-4 self-stretch rounded-xl border ${isDark ? 'border-white/20 bg-white/[0.06]' : 'border-[#ECEFF3] bg-white'
                    }`}
            >
                <div className="h-[246px] self-stretch relative overflow-hidden rounded-t-xl">
                    <Image src={article.image} alt={article.title} fill className="object-cover" sizes="100vw" />
                </div>
                <div className="flex flex-col items-start gap-3 p-4 pt-0">
                    <div className="flex items-center gap-2">
                        <span className="text-[#A5A5AB] font-inter text-sm font-medium leading-[100%] whitespace-nowrap">
                            {article.category}
                        </span>
                        <span className="text-[#A5A5AB] font-inter text-sm font-medium leading-[100%] whitespace-nowrap">
                            {article.date}
                        </span>
                    </div>
                    <h3
                        className={`font-bebas self-stretch font-bebas-neue text-2xl font-normal leading-[112%] capitalize ${isDark ? 'text-white' : 'text-[#4A4C56]'
                            }`}
                    >
                        {article.title}
                    </h3>
                    <p
                        className={`self-stretch font-inter text-base font-normal leading-[132%] ${isDark ? 'text-white/60' : 'text-[#777980]'
                            }`}
                    >
                        {article.excerpt}
                    </p>
                </div>
            </div>
        </Link>
    );
}