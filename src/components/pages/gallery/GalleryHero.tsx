import { SectionHeader } from '@/components/ui/SectionHeader';

export function GalleryHero() {
    return (
        <section className="abt-hero-bg flex pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 md:px-10 lg:px-6 xl:px-40 flex-col justify-center items-center gap-2.5 self-stretch">
            <SectionHeader
                badgeIcon="car"
                badgeText="Gallery"
                forceDark
                heading={
                    <>
                        Explore <span className="text-[#FEC300]">Stunning Moments</span> Captured at{' '}
                        Brightside Gallery
                    </>
                }
                subheading="Experience the beauty of our services through stunning moments captured at Brightside Gallery. Join us and see for yourself!"
            />
        </section>
    );
}