'use client';

import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';
import { useTheme } from '@/contexts/ThemeContext';
import type { TestimonialData } from '@/data/testimonials';

interface Props {
    testimonial: TestimonialData;
}

export function TestimonialCard({ testimonial }: Props) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const height = testimonial.tall ? 'h-[576px]' : 'h-[276px]';

    return (
        <div
            className={`flex w-full sm:w-[380px] lg:w-[424px] ${height} p-4 flex-col justify-between items-start rounded-lg border ${testimonial.featured
                ? 'border-[#DFE1E7] bg-[#092544]'
                : isDark
                    ? 'border-white/20 bg-white/[0.12]'
                    : 'border-[#DFE1E7] bg-[#F8FAFB]'
                }`}
        >
            {/* Top: Quote icon + Stars */}
            <div className="flex justify-between items-center self-stretch">
                <Icon
                    name="vector"
                    width={32}
                    height={32}
                    color={testimonial.featured ? '#0098E8' : '#B23730'}
                />
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Icon
                            key={star}
                            name="star"
                            width={16}
                            height={16}
                            color={star <= testimonial.rating ? '#FAAD14' : '#E8E8E8'}
                        />
                    ))}
                </div>
            </div>

            {/* Comment */}
            <p
                className={`flex-1 font-inter text-sm font-normal leading-[160%] mt-6 overflow-hidden ${testimonial.featured ? 'text-white/80' : isDark ? 'text-white/80' : 'text-[#4A4C56]'
                    }`}
            >
                {testimonial.comment}
            </p>

            {/* Bottom: Avatar + Name */}
            <div className="flex items-start gap-4 self-stretch mt-4">
                <div className="flex flex-col items-start gap-3 flex-1">
                    <span
                        className={`font-inter text-base font-medium leading-[100%] ${testimonial.featured ? 'text-white' : isDark ? 'text-white' : 'text-[#4A4C56]'
                            }`}
                    >
                        {testimonial.name}
                    </span>
                    <span
                        className={`font-inter text-sm font-normal leading-[100%] ${testimonial.featured ? 'text-white/60' : isDark ? 'text-white/60' : 'text-[#A5A5AB]'
                            }`}
                    >
                        {testimonial.title}
                    </span>
                </div>
                <div className="w-[42px] h-[42px] rounded-full relative overflow-hidden shrink-0">
                    <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="42px"
                    />
                </div>
            </div>
        </div>
    );
}