import { SectionHeader } from '@/components/ui/SectionHeader';
import { useTheme } from '@/contexts/ThemeContext';

export function AboutHero() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    return (
        <section className={`abt-hero-bg flex pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 px-4 md:px-6 lg:px-10 flex-col justify-center items-center gap-2.5 self-stretch ${isDark ? 'bg-[#1A1A1A]' : 'bg-white'}`}>
            <SectionHeader
                badgeIcon="car"
                badgeText="About Us"
                forceDark
                heading={
                    <>
                        <span className="text-white">Community-driven,</span>
                        <span className="text-[#B23730]">built on </span>
                        <span className="">service and </span>
                        <span className="text-[#9F9FA5]">support.</span>
                    </>
                }
                subheading="Hand-crafted care for your vehicle. Select any service below to add it to your booking then pick your date and time."
            />
        </section>
    );
}