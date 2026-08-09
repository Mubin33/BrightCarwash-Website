'use client';

import { useState } from 'react';  // 👈 Add useState
import { useGallery } from '@/hooks/useGallery';
import { useTheme } from '@/contexts/ThemeContext';
import { GalleryImageCard } from '../home/gallery/GalleryImageCard';
import { ImageModal } from '@/components/ui/ImageModal';  // 👈 Import modal
import { SkeletonGallery } from '@/components/ui/Skeleton';

function getCardHeight(seed: string, idx: number, colIndex: number) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }
    const jitter = hash % 40;
    const phase = (idx + colIndex) % 2;
    const base = phase === 0 ? 340 : 220;
    return base + jitter;
}

export function GalleryGrid() {
    const { theme } = useTheme();
    const { images, loading } = useGallery();
    const isDark = theme === 'dark';

    //  Modal state
    const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImageClick = (image: typeof images[0]) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedImage(null), 300);
    };

    // Distribute images to balance column heights
    const columns = Array.from({ length: 3 }, () => [] as Array<{ image: typeof images[0]; idx: number; colIndex: number; height: number }>);
    const columnHeights = [0, 0, 0];

    images.forEach((img, idx) => {
        const colIndex = idx % 3;
        const height = getCardHeight(img.id, idx, colIndex);

        const shortestCol = columnHeights.indexOf(Math.min(...columnHeights));
        columns[shortestCol].push({ image: img, idx, colIndex: shortestCol, height });
        columnHeights[shortestCol] += height + 16;
    });

    const nonEmptyColumns = columns.filter((col) => col.length > 0);

    if (loading) {
        return (
            <section className={`flex py-20 px-4 sm:px-6 md:px-10 lg:px-6 xl:px-40  flex-col justify-center items-center gap-12 self-stretch ${isDark ? 'bg-[#1A1A1A]' : 'bg-[#F5F5F5]'}`}>
                <SkeletonGallery isDark={isDark} />
            </section>
        );
    }

    if (images.length === 0) return null;

    return (
        <>
            <section
                className={`flex py-20 px-4 sm:px-6 md:px-10 lg:px-6 xl:px-40 flex-col justify-center items-center gap-12 self-stretch ${isDark ? 'bg-[#1A1A1A]' : 'bg-[#F5F5F5]'}`}
            >
                <div className="flex justify-center w-full">
                    <div className={`grid gap-4 w-full ${nonEmptyColumns.length === 1 ? 'grid-cols-1 max-w-106' :
                        nonEmptyColumns.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-218' :
                            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-330'
                        }`}>
                        {nonEmptyColumns.map((col, colIndex) => (
                            <div key={colIndex} className="flex flex-col gap-4">
                                {col.map((item) => (
                                    <GalleryImageCard
                                        key={`${item.image.id}-${item.idx}`}
                                        image={item.image}
                                        idx={item.idx}
                                        height={item.height}
                                        onClick={() => handleImageClick(item.image)} 
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <ImageModal
                image={selectedImage}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}