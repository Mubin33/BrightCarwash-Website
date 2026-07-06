'use client';

import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import type { NewsArticle } from '@/data/news';
import Link from 'next/link';

interface Props {
    article: NewsArticle;
}

export function NewsCard({ article }: Props) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    console.log('NewsCard image:', article.image);

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
                        <span className="text-[#A5A5AB] font-inter text-sm font-medium leading-[100%]">
                            {article.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-[#A5A5AB]" />
                        <span className="text-[#A5A5AB] font-inter text-sm font-medium leading-[100%]">
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