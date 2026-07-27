'use client';

import { useState, useEffect, useCallback } from 'react';
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

    const goTo = useCallback(
        (index: number) => {
            if (isTransitioning || index === currentIndex) return;
            setIsTransitioning(true);
            setCurrentIndex(index);
            setTimeout(() => setIsTransitioning(false), 1000); // match transition duration
        },
        [currentIndex, isTransitioning]
    );

    const goPrev = useCallback(() => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        goTo(newIndex);
    }, [currentIndex, images.length, goTo]);

    const goNext = useCallback(() => {
        const newIndex = (currentIndex + 1) % images.length;
        goTo(newIndex);
    }, [currentIndex, images.length, goTo]);

    // Auto-play
    useEffect(() => {
        if (autoPlayInterval <= 0 || images.length <= 1) return;
        const timer = setInterval(goNext, autoPlayInterval);
        return () => clearInterval(timer);
    }, [autoPlayInterval, images.length, goNext]);

    if (images.length === 0) return null;

    return (
        <div className="relative w-full h-full">
            {/* Images with fade transition */}
            {images.map((url, idx) => (
                <div
                    key={url}
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
                        className="object-cover"
                        priority={idx === 0}
                        sizes="100vw"
                        quality={90}
                        unoptimized
                    />
                </div>
            ))}

            {/* Controls – visible only if more than one image */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={goPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all duration-200 focus:outline-none"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={goNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all duration-200 focus:outline-none"
                        aria-label="Next image"
                    >
                        <ChevronRight size={24} />
                    </button>
                    {/* Dots indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => goTo(idx)}
                                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/50'
                                    }`}
                                aria-label={`Go to image ${idx + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}