'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { AboutHero } from './AboutHero';
import { WhoWeAre } from './WhoWeAre';
import { StatisticsSection } from '../home/all-sections/StatisticsSection';
import { LeadershipSection } from './LeadershipSection';
import { WhyBrightside } from './WhyBrightside';

export function AboutPageWrapper() {
    return (
        <div>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us', href: '/about' }]} />
            <AboutHero />
            <LeadershipSection />
            <WhoWeAre />
            <WhyBrightside />
        </div>
    );
}