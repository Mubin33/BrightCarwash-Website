'use client';

import { useGallery } from '@/hooks/useGallery';
import { useTheme } from '@/contexts/ThemeContext';
import { GalleryImageCard } from '../home/gallery/GalleryImageCard';

export function GalleryGrid() {
    const { theme } = useTheme();
    const { images, loading } = useGallery();
    const isDark = theme === 'dark';

    const columns = Array.from({ length: 3 }, (_, colIndex) =>
        images.filter((_, i) => i % 3 === colIndex)
    ).filter((col) => col.length > 0);

    if (loading) {
        return (
            <section className={`flex py-20 px-4 sm:px-6 md:px-10 lg:px-6 xl:px-40 2xl:px-[300px] flex-col justify-center items-center gap-12 self-stretch ${isDark ? 'bg-[#1A1A1A]' : 'bg-[#F5F5F5]'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[1320px]">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-[400px] sm:h-[500px] bg-gray-100 animate-pulse rounded-lg" />
                    ))}
                </div>
            </section>
        );
    }

    if (images.length === 0) return null;

    return (
        <section
            className={`flex py-20 px-4 sm:px-6 md:px-10 lg:px-6 xl:px-40 2xl:px-[300px] flex-col justify-center items-center gap-12 self-stretch ${isDark ? 'bg-[#1A1A1A]' : 'bg-[#F5F5F5]'}`}
        >
            <div className="flex justify-center w-full">
                <div className={`grid gap-4 w-full ${columns.length === 1 ? 'grid-cols-1 max-w-[424px]' :
                        columns.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-[872px]' :
                            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[1320px]'
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
        </section>
    );
}