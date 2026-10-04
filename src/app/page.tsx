import { createPageMetadata } from '@/lib/site';
import type { Metadata } from 'next';
import { HeroSection } from '@/components/pages/home/all-sections/HeroSection';
import { LocationsSection } from '@/components/pages/home/all-sections/LocationsSection';
import { ServicesSection } from '@/components/pages/home/all-sections/ServicesSection';
import { MembershipSection } from '@/components/pages/home/all-sections/MembershipSection';
import { HowItWorksSection } from '@/components/pages/home/all-sections/HowItWorksSection';
import { TestimonialsSection } from '@/components/pages/home/all-sections/TestimonialsSection';
import { NewsSection } from '@/components/pages/home/all-sections/NewsSection';
import { GallerySection } from '@/components/pages/home/all-sections/GallerySection';

export const metadata: Metadata = createPageMetadata(
    '/',
    'Premium Car Wash & Detailing in Naperville',
    'Book a premium wash, detailing, or membership at Brightside Car Wash in Naperville. Family-owned, veteran-operated, and built around convenience and care.',
);

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <LocationsSection />
      {/* <AboutSection /> */}
      <ServicesSection />
      <HowItWorksSection />
      <MembershipSection />
      <TestimonialsSection />
      <NewsSection />
      <GallerySection />
    </main>
  );
}