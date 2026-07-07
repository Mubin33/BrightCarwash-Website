import { ServicesHero } from '@/components/pages/services/ServicesHero';
import { ServicesList } from '@/components/pages/services/ServicesList';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function ServicesPage() {
    return (
        <div className="">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }]} />
            <ServicesHero />
            <ServicesList />
        </div>
    );
}