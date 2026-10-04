import { createPageMetadata } from '@/lib/site';

import type { Metadata } from 'next';
import { ServicesHero } from '@/components/pages/services/ServicesHero';
import { ServicesList } from '@/components/pages/services/ServicesList';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = createPageMetadata(
    '/services',
    'Car Wash Services',
    'Explore premium exterior washes, interior cleaning, detailing, memberships, and add-ons available at Brightside Car Wash in Naperville.',
);

export default function ServicesPage() {
    return (
        <div className="">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }]} />
            <ServicesHero />
            <ServicesList />
        </div>
    );
}