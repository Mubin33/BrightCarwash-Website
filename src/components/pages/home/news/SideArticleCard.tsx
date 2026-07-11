'use client';

import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import type { NewsArticle } from '@/data/news';
import { useRouter } from 'next/navigation';

interface Props {
    article: NewsArticle;
}

export function SideArticleCard({ article }: Props) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const router = useRouter();
    return (
        <div
            onClick={() => router.push(`/news/${article.slug}`)}
            className={`cursor-pointer flex items-center gap-4 self-stretch rounded-xl border min-h-[150px] ${isDark ? 'border-white/20 bg-white/[0.06]' : 'border-[#ECEFF3] bg-white'
                }`}
        >
            <div className="w-[120px] sm:w-[180px] lg:w-[246px] self-stretch relative overflow-hidden rounded-l-xl shrink-0 hidden sm:block">
                <Image src={article.image} alt={article.title} fill className="object-cover" sizes="246px" />
            </div>
            <div className="flex flex-col items-start gap-2 sm:gap-3 p-3 sm:p-4">
                <div className="flex items-center gap-2">
                    <span className="text-[#A5A5AB] font-inter text-xs sm:text-sm font-medium leading-[100%]">
                        {article.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#A5A5AB]" />
                    <span className="text-[#A5A5AB] font-inter text-xs sm:text-sm font-medium leading-[100%]">
                        {article.date}
                    </span>
                </div>
                <h3
                    className={`font-bebas self-stretch font-bebas-neue text-lg sm:text-xl lg:text-2xl font-normal leading-[112%] capitalize ${isDark ? 'text-white' : 'text-[#4A4C56]'
                        }`}
                >
                    {article.title}
                </h3>
                <p
                    className={`self-stretch font-inter text-xs sm:text-sm lg:text-base font-normal leading-[132%] ${isDark ? 'text-white/60' : 'text-[#777980]'
                        }`}
                >
                    {article.excerpt}
                </p>
            </div>
        </div>
    );
}