'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { StepCard } from './StepCard';
import { howItWorksData } from '@/data/how-it-works';
import { useTheme } from '@/contexts/ThemeContext';

export function HowItWorksSectionWrapper() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section
            className={` flex py-20 px-4 sm:px-8 lg:px-[300px] flex-col justify-center items-center gap-12 self-stretch border ${isDark
                ? 'border-white/20 bg-[#1A1A1A]'
                : 'border-[#DFE1E7] bg-white'
                }`}
        >
            <SectionHeader
                badgeIcon="car"
                badgeText={howItWorksData.badgeText}
                heading={
                    <>
                        <span className={isDark ? 'text-white' : 'text-[#1D1F2C]'}>
                            {howItWorksData.heading.prefix}{' '}
                        </span>
                        <span className="text-[#B23730]">{howItWorksData.heading.accent}</span>{' '}
                        <span className={isDark ? 'text-white/40' : 'text-[#1D1F2C]/40'}>
                            {howItWorksData.heading.muted}
                        </span>{' '}
                        <span className={isDark ? 'text-white' : 'text-[#1D1F2C]'}>
                            {howItWorksData.heading.suffix}
                        </span>
                    </>
                }
                subheading={howItWorksData.subheading}
            />

            {/* Steps Grid */}
            <div className="font-bebas grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1320px]">
                {howItWorksData.steps.map((step) => (
                    <StepCard key={step.number} step={step} />
                ))}
            </div>
        </section>
    );
}