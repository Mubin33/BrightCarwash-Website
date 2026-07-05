'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { TestimonialCard } from './TestimonialCard';
import { testimonials } from '@/data/testimonials';
import { useTheme } from '@/contexts/ThemeContext';

export function TestimonialsSectionWrapper() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section
            className={` flex py-20 px-4 sm:px-8 lg:px-[300px] flex-col justify-center items-center gap-12 self-stretch border ${isDark ? 'border-white/20 bg-[#1A1A1A]' : 'border-[#DFE1E7] bg-white'
                }`}
        >
            <SectionHeader
                badgeIcon="car"
                badgeText="Testimonials"
                heading={
                    <>
                        Discover what{' '}
                        <span className="text-[#B23730]">our happy</span> clients are{' '}
                        <span className="opacity-40">saying!</span>
                    </>
                }
                subheading="Our clients rave about the exceptional service and attention to detail they receive at every visit. Join them today!"
            />

            <div className="font-bebas columns-1 md:columns-2 lg:columns-3 gap-1 w-full max-w-[1320px] [&_>_*]:mb-0">
                {testimonials.map((t) => (
                    <div key={t.id} className="break-inside-avoid p-2">
                        <TestimonialCard testimonial={t} />
                    </div>
                ))}
            </div>
        </section>
    );
}