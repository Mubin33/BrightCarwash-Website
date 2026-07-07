import { GalleryGrid } from '@/components/pages/gallery/GalleryGrid';
import { GalleryHero } from '@/components/pages/gallery/GalleryHero';
import { Breadcrumb } from '@/components/ui/Breadcrumb';


export default function GalleryPage() {
    return (
        <>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Gallery', href: '/gallery' }]} />
            <GalleryHero />
            <GalleryGrid />
        </>

    );
}