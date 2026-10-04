import { createPageMetadata } from '@/lib/site';
import type { Metadata } from 'next';
import { NewsHero } from '@/components/pages/news/NewsHero';
import { NewsList } from '@/components/pages/news/NewsList';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = createPageMetadata(
    '/news',
    'News & Events',
    'Read car care tips, local stories, special offers, and behind-the-scenes updates from Brightside Car Wash in Naperville.',
);

export default function NewsPage() {
    return (
        <div >
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'News & Events', href: '/news' }]} />
            <NewsHero />
            <NewsList />
        </div>
    );
}