'use client';

import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import type { NewsDetail } from '@/data/news-detail';

interface Props {
    article: NewsDetail;
}

export function NewsDetailContent({ article }: Props) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section
            className={`flex py-10 px-4 sm:px-8 lg:px-[300px] flex-col justify-center items-center gap-12 self-stretch border ${isDark ? 'border-white/20 bg-[#1A1A1A]' : 'border-[#DFE1E7] bg-white'
                }`}
        >
            <div className="flex flex-col items-start gap-8 self-stretch max-w-[1320px]">
                {/* Image */}
                <div className="h-[300px] sm:h-[400px] lg:h-[450px] self-stretch rounded-lg relative overflow-hidden">
                    <Image src={article.image} alt={article.title} fill className="object-cover" sizes="100vw" />
                </div>

                {/* Title */}
                <h1
                    className={`font-bebas text-3xl sm:text-4xl lg:text-5xl font-normal leading-[124%] tracking-[0.96px] capitalize ${isDark ? 'text-white' : 'text-[#1D1F2C]'
                        }`}
                >
                    {article.title}
                </h1>

                {/* Meta */}
                <div className="flex items-center gap-2">
                    <span className="text-[#A5A5AB] font-inter text-sm font-medium leading-[100%]">
                        {article.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#A5A5AB]" />
                    <span className="text-[#A5A5AB] font-inter text-sm font-medium leading-[100%]">
                        {article.date}
                    </span>
                </div>

                {/* First Half */}
                <p
                    className={`self-stretch font-inter text-base font-normal leading-[160%] ${isDark ? 'text-white/80' : 'text-[#4A4C56]'
                        }`}
                >
                    {article.firstHalf}
                </p>

                {/* Images */}
                <div className="flex flex-col sm:flex-row items-start gap-6 self-stretch">
                    {article.images.map((img, i) => (
                        <div key={i} className="h-[300px] sm:h-[450px] flex-1 rounded-lg relative overflow-hidden">
                            <Image src={img} alt={`${article.title} ${i + 1}`} fill className="object-cover" sizes="50vw" />
                        </div>
                    ))}
                </div>

                {/* Second Half */}
                <p
                    className={`self-stretch font-inter text-base font-normal leading-[160%] ${isDark ? 'text-white/80' : 'text-[#4A4C56]'
                        }`}
                >
                    {article.secondHalf}
                </p>
            </div>
        </section>
    );
}