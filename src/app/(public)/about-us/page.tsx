import { createPageMetadata } from '@/lib/site';
import type { Metadata } from 'next';
import { AboutPageWrapper } from '@/components/pages/about/AboutPageWrapper';

export const metadata: Metadata = createPageMetadata(
    '/about-us',
    'About Us',
    'Learn about Brightside Car Wash, a veteran-owned family business serving Naperville with premium wash, detailing, and membership options.',
);

export default function AboutPage() {
    return <AboutPageWrapper />;
}