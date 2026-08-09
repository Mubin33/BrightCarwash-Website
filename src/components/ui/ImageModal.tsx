'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import type { GalleryImage } from '@/types/gallery';

interface ImageModalProps {
    image: GalleryImage | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ImageModal({ image, isOpen, onClose }: ImageModalProps) {
    const handleEsc = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        } else {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleEsc]);

    // Debug log
    console.log('Modal image:', image);

    if (!isOpen || !image) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={handleBackdropClick}
        >
            <div className="relative max-w-7xl w-full max-h-[90vh]">
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 sm:right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-200"
                    aria-label="Close modal"
                >
                    <X size={28} />
                </button>

                <div className="relative w-full h-[80vh] rounded-xl overflow-hidden bg-black/20">


                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                        priority
                        unoptimized
                        onError={(e) => {
                            console.error('Image failed to load:', image.src);
                            console.error('Error event:', e);
                        }}
                        onLoad={() => {
                            console.log('Image loaded successfully:', image.src);
                        }}
                    />

                    {image.label && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-linear-to-t from-black/80 to-transparent">
                            <span className="text-white font-bebas-neue text-2xl sm:text-3xl md:text-4xl font-normal leading-[100%]">
                                {image.label}
                            </span>
                        </div>
                    )}
                </div>

                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/60 font-inter text-sm whitespace-nowrap">
                    Click outside or press ESC to close
                </div>
            </div>
        </div>
    );
}