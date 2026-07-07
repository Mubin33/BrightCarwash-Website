'use client';

import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SideArticleCard } from './SideArticleCard';
import { useNewsList } from '@/hooks/useNewsList';
import { useTheme } from '@/contexts/ThemeContext';
import { MoveUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

export function NewsSectionWrapper() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const { articles, loading } = useNewsList(1, 4);

    if (loading || articles.length === 0) {
        return null;
    }

    const featuredArticle = articles[0];
    const sideArticles = articles.slice(1, 4);

    return (
        <section
            className={`flex py-20 px-4 sm:px-8 lg:px-[300px] flex-col justify-center items-center gap-12 self-stretch border ${isDark ? 'border-white/20 bg-[#1A1A1A]' : 'border-[#DFE1E7] bg-[#ECEFF3]'
                }`}
        >
            <SectionHeader
                badgeIcon="car"
                badgeText="News & Events"
                heading={
                    <>
                        Stay{' '}
                        <span className="text-[#B23730]">informed</span> with{' '}
                        <span className="opacity-40">BrightSide's</span> latest updates!
                    </>
                }
                subheading="Car care tips, local news, exclusive offers, and behind-the-scenes stories from Naperville's favorite car wash."
            />

            <div className="flex flex-col lg:flex-row items-stretch gap-6 self-stretch">

                <div
                    className={`flex-1 flex-col items-start rounded-xl border overflow-hidden ${isDark ? 'border-white/20 bg-white/[0.06]' : 'border-[#ECEFF3] bg-white'
                        }`}
                >
                    <div className="h-56 sm:h-80 lg:h-[324px] self-stretch relative">
                        <Image
                            src={featuredArticle.image}
                            alt={featuredArticle.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                    <div className="flex px-5 pb-4 pt-3 flex-col items-start gap-3 self-stretch">
                        <div className="flex items-center gap-2">
                            <span className="text-[#A5A5AB] font-inter text-sm font-medium leading-[100%]">
                                {featuredArticle.category}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-[#A5A5AB]" />
                            <span className="text-[#A5A5AB] font-inter text-sm font-medium leading-[100%]">
                                {featuredArticle.date}
                            </span>
                        </div>
                        <h3
                            className={`font-bebas w-full font-bebas-neue text-4xl font-normal leading-[100%] capitalize ${isDark ? 'text-white' : 'text-[#1D1F2C]'
                                }`}
                        >
                            {featuredArticle.title}
                        </h3>
                        <p
                            className={`self-stretch font-inter text-base font-normal leading-[160%] tracking-[0.16px] ${isDark ? 'text-white/80' : 'text-[#4A4C56]'
                                }`}
                        >
                            {featuredArticle.excerpt}
                        </p>
                    </div>
                </div>

                {/* Side Articles (Right) */}
                <div className="flex flex-col justify-between items-start flex-1 self-stretch gap-4">
                    {sideArticles.map((article) => (
                        <SideArticleCard key={article.id} article={article} />
                    ))}
                </div>
            </div>
            <Link href="/news">
                <Button className="flex py-[14px] px-5 justify-center items-center gap-2 rounded-lg bg-[#0098E8] text-white font-inter text-lg hover:bg-[#0088D8]">
                    Read All
                    <Icon name="book" width={20} height={20} />
                </Button>
            </Link>
        </section>
    );
}