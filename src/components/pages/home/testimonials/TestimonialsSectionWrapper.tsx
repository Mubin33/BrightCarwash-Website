'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { TestimonialCard } from './TestimonialCard';
import { useTestimonials } from '@/hooks/useTestimonials';
import { useTheme } from '@/contexts/ThemeContext';

export function TestimonialsSectionWrapper() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const { testimonials, loading } = useTestimonials(1, 5);

    if (loading) {
        return (
            <section className={`flex py-20 px-4 sm:px-6 md:px-10 lg:px-6 xl:px-40 2xl:px-[300px] flex-col justify-center items-center gap-12 self-stretch border ${isDark ? 'border-white/20 bg-[#1A1A1A]' : 'border-[#DFE1E7] bg-white'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[1320px]">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-[300px] sm:h-[500px] bg-gray-100 animate-pulse rounded-lg" />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section
            className={`flex py-20 px-4 sm:px-6 md:px-10 lg:px-6 xl:px-40 2xl:px-[300px] flex-col justify-center items-center gap-12 self-stretch border ${isDark ? 'border-white/20 bg-[#1A1A1A]' : 'border-[#DFE1E7] bg-white'}`}
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

            <div className="columns-1 md:columns-2 lg:columns-3 gap-1 w-full max-w-[1320px] [&_>_*]:mb-0">
                {testimonials.map((t, i) => {
                    const isLast = i === testimonials.length - 1;
                    const cardData = {
                        ...t,
                        tall: isLast ? true : t.tall,
                        featured: isLast,
                    };
                    return (
                        <div key={t.id} className="break-inside-avoid p-2">
                            <TestimonialCard testimonial={cardData} />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}