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
    );


    if (loading) {
        return (
            <section
                className={`flex py-20 px-4 sm:px-8 lg:px-[300px] flex-col justify-center items-center gap-12 self-stretch border ${isDark ? 'border-white/20 bg-[#1A1A1A]' : 'border-[#DFE1E7] bg-white'
                    }`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[1320px]">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-[500px] bg-gray-100 animate-pulse rounded-lg" />
                    ))}
                </div>
            </section>
        );
    }


    return (
        <section
            className={`flex py-20 px-4 sm:px-8 lg:px-[300px] flex-col justify-center items-center gap-12 self-stretch ${isDark ? 'bg-[#1A1A1A]' : 'bg-[#F5F5F5]'
                }`}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[1320px]">
                {columns.map((col, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-4 h-auto md:h-[600px] lg:h-[800px]">
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
        </section>
    );
}