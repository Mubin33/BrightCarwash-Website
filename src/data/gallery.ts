export interface GalleryImage {
    id: string;
    src: string;
    alt: string;
    label?: string;
    tall?: boolean;
}

export const galleryImages: GalleryImage[] = [
    {
        id: '1',
        src: '/images/gallery-1.png',
        alt: 'Express Detail Interior',
        label: 'Express Detail Interior',
    },
    {
        id: '2',
        src: '/images/gallery-2.png',
        alt: 'Full Service Wash',
        label: 'Full Service Wash',
        tall: true,
    },
    {
        id: '3',
        src: '/images/gallery-3.png',
        alt: 'Premium Detailing',
        label: 'Premium Detailing',
    },
    {
        id: '4',
        src: '/images/gallery-4.png',
        alt: 'Interior Shampoo',
        label: 'Interior Shampoo',
    },
    {
        id: '5',
        src: '/images/gallery-5.png',
        alt: 'Ceramic Coating',
        label: 'Ceramic Coating',
        tall: true,
    },
    {
        id: '6',
        src: '/images/gallery-6.png',
        alt: 'Fleet Service',
        label: 'Fleet Service',
    },

];