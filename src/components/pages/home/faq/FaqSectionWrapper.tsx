'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { FaqAccordion } from './FaqAccordion';
import { faqItems } from '@/data/faq';
import { useTheme } from '@/contexts/ThemeContext';

export function FaqSectionWrapper() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section
            className={`font-bebas flex py-20 px-4 sm:px-8 lg:px-[300px] flex-col justify-center items-center gap-12 self-stretch border ${isDark ? 'border-white/20 bg-[#1A1A1A]' : 'border-[#DFE1E7] bg-white'
                }`}
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

            <div className="flex flex-col gap-4 w-full max-w-[1320px]">
                {faqItems.map((item) => (
                    <FaqAccordion key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}