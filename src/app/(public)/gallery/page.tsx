import { createPageMetadata } from '@/lib/site';
import type { Metadata } from 'next';
import { GalleryGrid } from '@/components/pages/gallery/GalleryGrid';
import { GalleryHero } from '@/components/pages/gallery/GalleryHero';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = createPageMetadata(
    '/gallery',
    'Car Wash Gallery',
    'See the latest Brightside Car Wash transformations, detailing work, and community moments from our Naperville locations.',
);

export default function GalleryPage() {
    return (
        <>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Gallery', href: '/gallery' }]} />
            <GalleryHero />
            <GalleryGrid />
        </>

    );
}