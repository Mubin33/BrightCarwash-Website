import Image from 'next/image';
import type { GalleryImage } from '@/data/gallery';

function getCardHeight(seed: string, idx: number, colIndex: number) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }
    const jitter = hash % 40;
    const phase = (idx + colIndex) % 2;
    const base = phase === 0 ? 340 : 220; // tall vs short alternation
    return base + jitter;
}

interface Props {
    image: GalleryImage;
    seed?: string;
    idx: number;
    colIndex?: number;
}

export function GalleryImageCard({ image, seed, idx, colIndex = 0 }: Props) {
    const height = getCardHeight(seed ?? image.id, idx, colIndex);
    return (
        <div
            className="relative w-full overflow-hidden rounded-xl group"
            style={{ height: `${height}px` }}
        >
            <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 424px"
                unoptimized
            />
            {image.label && (
                <span className="absolute bottom-5 left-5 text-white font-bebas-neue text-2xl font-normal leading-[100%]">
                    {image.label}
                </span>
            )}
        </div>
    );
}