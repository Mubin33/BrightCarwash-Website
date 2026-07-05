'use client';

import { galleryImages } from '@/data/gallery';
import { useTheme } from '@/contexts/ThemeContext';
import { GalleryImageCard } from '../home/gallery/GalleryImageCard';

const COLS = 3;

const columns = Array.from({ length: COLS }, (_, colIndex) =>
    galleryImages.filter((_, i) => i % COLS === colIndex)
);

export function GalleryGrid() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

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