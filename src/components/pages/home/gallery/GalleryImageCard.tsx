import Image from 'next/image';
import type { GalleryImage } from '@/data/gallery';

function getFlexGrow(seed: string, idx: number, colIndex: number) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }
    const jitter = (hash % 25) / 100;
    const phase = (idx + colIndex) % 2;
    const base = phase === 0 ? 2.0 : 1.0;
    return base + jitter;
}

interface Props {
    image: GalleryImage;
    seed?: string;
    idx: number;
    colIndex?: number;
}

export function GalleryImageCard({ image, seed, idx, colIndex = 0 }: Props) {
    const grow = getFlexGrow(seed ?? image.id, idx, colIndex);

    return (
        <div
            className="relative w-full min-h-[200px] overflow-hidden rounded-xl group"
            style={{ flexGrow: grow, flexBasis: 0 }}
        >
            <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 424px"
            />
            {image.label && (
                <span className="absolute bottom-5 left-5 text-white font-bebas-neue text-2xl font-normal leading-[100%]">
                    {image.label}
                </span>
            )}
        </div>
    );
}