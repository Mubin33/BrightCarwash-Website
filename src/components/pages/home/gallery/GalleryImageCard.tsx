import Image from 'next/image';
import type { GalleryImage } from '@/data/gallery';

interface Props {
    image: GalleryImage;
    idx: number;
    height?: number;
    showLabel?: boolean;
}

export function GalleryImageCard({ image, height, showLabel = true }: Props) {
    return (
        <div
            className="relative w-full h-full overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-2 hover:z-10 hover:shadow-xl hover:shadow-black/20"
            style={height ? { height: `${height}px` } : undefined}
        >
            <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 424px"
                unoptimized
            />
            {showLabel && image.label && (
                <span className="absolute bottom-5 left-5 text-white font-bebas-neue text-2xl font-normal leading-[100%]">
                    {image.label}
                </span>
            )}
        </div>
    );
}