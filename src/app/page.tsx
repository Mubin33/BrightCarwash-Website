import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/pages/home/HeroSection';
import { LocationsSection } from '@/components/pages/home/LocationsSection';
import { StatisticsSection } from '@/components/pages/home/StatisticsSection';
import { ServicesSection } from '@/components/pages/home/ServicesSection';
import { AboutSection } from '@/components/pages/home/AboutSection';
import { MembershipSection } from '@/components/pages/home/MembershipSection';
import { HowItWorksSection } from '@/components/pages/home/HowItWorksSection';
import { TestimonialsSectionWrapper } from '@/components/pages/home/testimonials/TestimonialsSectionWrapper';
import { TestimonialsSection } from '@/components/pages/home/TestimonialsSection';
import { NewsSection } from '@/components/pages/home/NewsSection';
import { GallerySection } from '@/components/pages/home/GallerySection';
import { FaqSection } from '@/components/pages/home/FaqSection';


export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
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
      <FaqSection />
    </main>
  );
}