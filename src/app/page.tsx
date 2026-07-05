import { HeroSection } from '@/components/pages/home/all-sections/HeroSection';
import { LocationsSection } from '@/components/pages/home/all-sections/LocationsSection';
import { StatisticsSection } from '@/components/pages/home/all-sections/StatisticsSection';
import { ServicesSection } from '@/components/pages/home/all-sections/ServicesSection';
import { AboutSection } from '@/components/pages/home/all-sections/AboutSection';
import { MembershipSection } from '@/components/pages/home/all-sections/MembershipSection';
import { HowItWorksSection } from '@/components/pages/home/all-sections/HowItWorksSection';
import { TestimonialsSection } from '@/components/pages/home/all-sections/TestimonialsSection';
import { NewsSection } from '@/components/pages/home/all-sections/NewsSection';
import { GallerySection } from '@/components/pages/home/all-sections/GallerySection';


export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <LocationsSection />
      <StatisticsSection />
      <ServicesSection />
      <AboutSection />
      <HowItWorksSection />
      <MembershipSection />
      <TestimonialsSection />
      <NewsSection />
      <GallerySection />

    </main>
  );
}