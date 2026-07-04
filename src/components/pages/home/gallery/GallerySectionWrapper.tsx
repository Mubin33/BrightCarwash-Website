'use client';

import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { MoveUpRight } from 'lucide-react';
import { GalleryImageCard } from './GalleryImageCard';
import { galleryImages } from '@/data/gallery';
import { useTheme } from '@/contexts/ThemeContext';

export function GallerySectionWrapper() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section
            className={`font-bebas flex py-20 px-4 sm:px-8 lg:px-[300px] flex-col justify-center items-center gap-12 self-stretch border ${isDark ? 'border-white/20 bg-[#1A1A1A]' : 'border-[#DFE1E7] bg-white'
                }`}
        >
            <SectionHeader
                badgeIcon="car"
                badgeText="Gallery"
                heading={
                    <>
                        Explore{' '}
                        <span className="text-[#B23730]">Stunning Moments</span> Captured at{' '}
                        <span className="opacity-40">Brightside</span> Gallery
                    </>
                }
                subheading="Experience the beauty of our services through stunning moments captured at Brightside Gallery. Join us and see for yourself!"
            />

            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 w-full max-w-[1320px]">
                {galleryImages.map((img) => (
                    <div key={img.id} className="break-inside-avoid mb-4">
                        <GalleryImageCard image={img} />
                    </div>
                ))}
            </div>

            <Link href="/gallery">
                <Button className="flex py-[14px] px-5 justify-center items-center gap-2 rounded-lg bg-[#0098E8] text-white font-inter text-xl hover:bg-[#0088D8]">
                    See more transformation
                    <MoveUpRight size={16} />
                </Button>
            </Link>
        </section>
    );
}