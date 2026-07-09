'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { FaqAccordion } from './FaqAccordion';
import { useFaqs } from '@/hooks/useFaqs';
import { useTheme } from '@/contexts/ThemeContext';

export function FaqSectionWrapper() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const { faqs, loading } = useFaqs();

    if (loading) {
        return (
            <section className={`flex py-20 px-4 md:px-6 lg:px-10 flex-col justify-center items-center gap-12 self-stretch border ${isDark ? 'border-white/20 bg-[#1A1A1A]' : 'border-[#DFE1E7] bg-white'}`}>
                <div className="flex flex-col gap-4 w-full max-w-[1280px] xl:max-w-[1320px] 2xl:max-w-[1600px]">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-20 bg-gray-100 animate-pulse rounded-lg" />
                    ))}
                </div>
            </section>
        );
    }

    if (faqs.length === 0) return null;

    return (
        <section
            className={`flex py-20 px-4 md:px-6 lg:px-10 flex-col justify-center items-center gap-12 self-stretch border ${isDark ? 'border-white/20 bg-[#1A1A1A]' : 'border-[#DFE1E7] bg-white'}`}
        >
            <SectionHeader
                badgeIcon="car"
                badgeText="FAQ"
                heading={
                    <>
                        Everything{' '}
                        <span className="text-[#B23730]">You Need</span> to Know{' '}
                        <span className="opacity-40">Before You</span> Visit
                    </>
                }
                subheading="From memberships to detailing appointments, here's what our Naperville neighbors ask most. No guesswork, just honest answers from a team that genuinely cares."
            />

            <div className="flex flex-col gap-4 w-full max-w-[1280px] xl:max-w-[1320px] 2xl:max-w-[1600px]">
                {faqs.map((item) => (
                    <FaqAccordion key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}