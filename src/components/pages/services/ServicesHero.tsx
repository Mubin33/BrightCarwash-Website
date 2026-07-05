import { SectionHeader } from '@/components/ui/SectionHeader';

export function ServicesHero() {
    return (
        <section className="adm-hero-bg flex pt-32 pb-20 px-4 sm:px-8 lg:px-[300px] flex-col justify-center items-center gap-2.5 self-stretch">
            <SectionHeader
                badgeIcon="car"
                badgeText="Our Services"
                forceDark
                heading={
                    <>
                        Explore <span className="text-[#B23730]">Stunning Moments</span> Captured at{' '}
                        <span className="text-[#9F9FA5]">Brightside</span> Gallery
                    </>
                }
                subheading="Experience the beauty of our services through stunning moments captured at Brightside Gallery. Join us and see for yourself!"
            />
        </section>
    );
}