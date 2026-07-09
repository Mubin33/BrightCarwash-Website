'use client';

import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { GalleryImageCard } from './GalleryImageCard';
import { useGallery } from '@/hooks/useGallery';
import { useTheme } from '@/contexts/ThemeContext';
import { Icon } from '@/components/ui/Icon';

export function GallerySectionWrapper() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const { images, loading } = useGallery();

    const columns = Array.from({ length: 3 }, (_, colIndex) =>
        images.filter((_, i) => i % 3 === colIndex)
    ).filter((col) => col.length > 0);

    if (loading) {
        return (
            <section className={`flex py-20 px-4 md:px-6 lg:px-10 flex-col justify-center items-center gap-12 self-stretch ${isDark ? 'bg-[#1A1A1A]' : 'bg-white'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[1280px] xl:max-w-[1320px] 2xl:max-w-[1600px]">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-[300px] sm:h-[500px] bg-gray-100 animate-pulse rounded-lg" />
                    ))}
                </div>
            </section>
        );
    }

    if (images.length === 0) return null;

    return (
        <section
            className={`flex py-20 px-4 md:px-6 lg:px-10 flex-col justify-center items-center gap-12 self-stretch border ${isDark ? 'border-white/20 bg-[#1A1A1A]' : 'border-[#DFE1E7] bg-white'}`}
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

            <div className="flex justify-center w-full">
                <div className={`grid gap-4 w-full max-w-[1280px] xl:max-w-[1320px] 2xl:max-w-[1600px] ${columns.length === 1 ? 'grid-cols-1' :
                        columns.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    }`}>
                    {columns.map((col, colIndex) => (
                        <div key={colIndex} className="flex flex-col gap-4">
                            {col.map((img, idx) => (
                                <GalleryImageCard
                                    key={`${img.id}-${idx}`}
                                    image={img}
                                    seed={`${img.id}-${idx}`}
                                    idx={idx}
                                    colIndex={colIndex}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <Link href="/gallery">
                <Button className="flex py-[14px] px-5 justify-center items-center gap-2 rounded-lg bg-[#0098E8] text-white font-inter text-base lg:text-xl hover:bg-[#0088D8]">
                    See more transformation
                    <Icon name="book" width={20} height={20} />
                </Button>
            </Link>
        </section>
    );
}