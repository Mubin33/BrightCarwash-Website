import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/pages/home/HeroSection';
import { LocationsSection } from '@/components/pages/home/LocationsSection';
import { StatisticsSection } from '@/components/pages/home/StatisticsSection';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <LocationsSection />
      <StatisticsSection />
    </main>
  );
}