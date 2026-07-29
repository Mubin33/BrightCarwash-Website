'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroBackgroundCarouselProps {
    images: string[];
    autoPlayInterval?: number; // in ms, 0 = no auto-play
}

export function HeroBackgroundCarousel({
    images,
    autoPlayInterval = 5000,
}: HeroBackgroundCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const goTo = useCallback(
        (index: number) => {
            if (isTransitioning || index === currentIndex || images.length === 0) return;

            const safeIndex = ((index % images.length) + images.length) % images.length;
            if (safeIndex === currentIndex) return;

            setIsTransitioning(true);
            setCurrentIndex(safeIndex);

            setTimeout(() => {
                setIsTransitioning(false);
            }, 1000);
        },
        [currentIndex, isTransitioning, images.length]
    );

    const goPrev = useCallback(() => {
        if (images.length <= 1 || isTransitioning) return;
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        goTo(newIndex);
    }, [currentIndex, images.length, goTo, isTransitioning]);

    const goNext = useCallback(() => {
        if (images.length <= 1 || isTransitioning) return;
        const newIndex = (currentIndex + 1) % images.length;
        goTo(newIndex);
    }, [currentIndex, images.length, goTo, isTransitioning]);

    const resetInterval = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        if (autoPlayInterval > 0 && images.length > 1) {
            intervalRef.current = setInterval(() => {
                goNext();
            }, autoPlayInterval);
        }
    }, [autoPlayInterval, goNext, images.length]);

    useEffect(() => {
        resetInterval();
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [resetInterval]);

    const handleImageLoad = useCallback((index: number) => {
        setLoadedImages((prev) => {
            const newSet = new Set(prev);
            newSet.add(index);
            return newSet;
        });
    }, []);

    if (images.length === 0) return null;

    return (
        <div className="relative w-full h-full">
            {/* Images with fade transition */}
            {images.map((url, idx) => {
                // First image: object-center, others: object-top
                const objectPositionClass = idx === 0 ? 'object-center' : 'object-top';

                return (
                    <div
                        key={`${url}-${idx}`}
                        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                        style={{
                            opacity: idx === currentIndex ? 1 : 0,
                            zIndex: idx === currentIndex ? 1 : 0,
                        }}
                    >
                        <Image
                            src={url}
                            alt={`Hero background ${idx + 1}`}
                            fill
                            className={`object-cover ${objectPositionClass}`}
                            priority={idx === 0}
                            sizes="100vw"
                            quality={90}
                            unoptimized
                            onLoad={() => handleImageLoad(idx)}
                        />
                        {/* Skeleton while loading */}
                        {!loadedImages.has(idx) && (
                            <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                        )}
                    </div>
                );
            })}

            {/* Controls – visible only if more than one image */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            goPrev();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 hover:scale-110 transform"
                        aria-label="Previous image"
                        type="button"
                        disabled={isTransitioning}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            goNext();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 hover:scale-110 transform"
                        aria-label="Next image"
                        type="button"
                        disabled={isTransitioning}
                    >
                        <ChevronRight size={24} />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    goTo(idx);
                                }}
                                className={`transition-all duration-300 ${idx === currentIndex
                                    ? 'bg-white w-4 h-2 rounded-full'
                                    : 'bg-white/50 w-2 h-2 rounded-full hover:bg-white/80'
                                    }`}
                                aria-label={`Go to image ${idx + 1}`}
                                type="button"
                                disabled={isTransitioning}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}