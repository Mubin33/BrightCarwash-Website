"use client";

import Image from 'next/image';

interface HeroBannerProps {
    bannerImageUrl: string;
}

export function HeroBanner({ bannerImageUrl }: HeroBannerProps) {
    return (
        <div className="w-full lg:max-w-[500px] xl:max-w-[648px]">
            <div className="w-full rounded-xl overflow-hidden">
                <Image
                    src={bannerImageUrl}
                    alt="Hero banner"
                    width={648}
                    height={500}
                    className="w-full h-auto object-cover rounded-xl"
                    unoptimized
                />
            </div>
        </div>
    );
}