import { ServicesHero } from '@/components/pages/services/ServicesHero';
import { ServicesList } from '@/components/pages/services/ServicesList';
import { Breadcrumb } from '@/components/ui/Breadcrumb';


export default function ServicesPage() {
    return (
        <>
            <div className='pt-21 sm:pt-22 md:pt-24 lg:pt-28'>
                <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }]} />
                <ServicesHero />
                <ServicesList />
            </div>

        </>
    );
}