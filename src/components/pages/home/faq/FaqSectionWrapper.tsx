'use client';

import { FaqAccordion } from './FaqAccordion';
import { FaqBadge } from './FaqBadge';
import { useFaqs } from '@/hooks/useFaqs';
import { useTheme } from '@/contexts/ThemeContext';

export function FaqSectionWrapper() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const { faqs, loading } = useFaqs();

    if (loading) {
        return (
            <section className={`flex py-20 px-4 md:px-6 lg:px-10 flex-col justify-center items-center gap-12 self-stretch ${isDark ? 'bg-[#1A1A1A]' : 'bg-[#FFF7E6]'}`}>
                <div className="flex flex-col gap-4 w-full max-w-[872px]">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-20 bg-gray-100 dark:bg-white/10 animate-pulse rounded-lg" />
                    ))}
                </div>
            </section>
        );
    }

    if (faqs.length === 0) return null;

    return (
        <section className={`self-stretch px-4 md:px-8 lg:px-16 xl:px-72 py-20 flex flex-col justify-center items-center gap-12 ${isDark ? 'bg-[#1A1A1A]' : 'bg-[#FFF7E6]'}`}>
            <div className="self-stretch flex flex-col justify-end items-center gap-3">
                <FaqBadge isDark={isDark} />
                <div className="self-stretch flex flex-col justify-center items-center gap-4">
                    <div className="w-full max-w-[384px] text-center">
                        <span className={`text-5xl font-normal font-['Bebas_Neue'] leading-[55.68px] ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Everything You Need to Know{' '}
                        </span>
                        <span className="text-[#FEC300] text-5xl font-normal font-['Bebas_Neue'] leading-[55.68px]">
                            Before You
                        </span>
                        <span className={`text-5xl font-normal font-['Bebas_Neue'] leading-[55.68px] ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {' '}Visit
                        </span>
                    </div>
                    <div className={`w-full max-w-[666px] text-center text-base font-normal font-['Inter'] leading-6 ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>
                        From memberships to detailing appointments, here&apos;s what our Naperville neighbors ask most. No guesswork, just honest answers from a team that genuinely cares.
                    </div>
                </div>
            </div>
            <div className="w-full max-w-[872px] flex flex-col justify-start items-start gap-4">
                {faqs.map((item) => (
                    <FaqAccordion key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}