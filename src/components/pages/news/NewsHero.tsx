import { SectionHeader } from '@/components/ui/SectionHeader';

export function NewsHero() {
    return (
        <section className="glr-hero-bg flex pt-32 pb-20 px-4 sm:px-8 lg:px-[300px] flex-col justify-center items-center gap-2.5 self-stretch">
            <SectionHeader
                badgeIcon="car"
                badgeText="News & Events"
                forceDark
                heading={
                    <>
                        Stay <span className="text-[#B23730]">informed</span> with{' '}
                        <span className="text-[#9F9FA5]">BrightSide's</span> latest updates!
                    </>
                }
                subheading="Car care tips, local news, exclusive offers, and behind-the-scenes stories from Naperville's favorite car wash."
            />
        </section>
    );
}