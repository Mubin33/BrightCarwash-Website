import type { ApiGalleryImage } from '@/types/gallery';

export interface GalleryImage {
    id: string;
    src: string;
    alt: string;
    label?: string;
    tall?: boolean;
}

export function transformGalleryImage(api: ApiGalleryImage, index: number): GalleryImage {
    return {
        id: api.id,
        src: api.image,
        alt: api.name,
        label: api.name,
        tall: index % 3 === 1,
    };
}