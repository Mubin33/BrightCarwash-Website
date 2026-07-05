import { GalleryGrid } from '@/components/pages/gallery/GalleryGrid';
import { GalleryHero } from '@/components/pages/gallery/GalleryHero';
import { Breadcrumb } from '@/components/ui/Breadcrumb';


export default function GalleryPage() {
    return (
        <div className="pt-21 sm:pt-22 md:pt-24 lg:pt-28">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Gallery', href: '/gallery' }]} />
            <GalleryHero />
            <GalleryGrid />
        </div>
    );
}