import Image from 'next/image';
import type { GalleryImage } from '@/data/gallery';

interface Props {
    image: GalleryImage;
}

export function GalleryImageCard({ image }: Props) {
    return (
        <div className="relative overflow-hidden rounded-xl group">
            <div
                className="w-full flex items-center rounded-xl"
            >
                <Image
                    src={image.src}
                    alt={image.alt}
                    width={424}
                    height={image.tall ? 500 : 384}
                    className="w-full object-cover rounded-xl "
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 424px"
                    style={{ height: image.tall ? '420px' : '384px' }}
                />
            </div>
            {image.label && (
                <span className="absolute bottom-5 left-5 text-white font-bebas-neue text-2xl font-normal leading-[100%]">
                    {image.label}
                </span>
            )}
        </div>
    );
}