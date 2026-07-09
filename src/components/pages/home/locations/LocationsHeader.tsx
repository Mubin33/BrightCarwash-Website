'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';

export function LocationsHeader() {
    return (
        <SectionHeader
            badgeIcon="car"
            badgeText="Find us now"
            heading={
                <>
                    Two <span className="text-[#B23730]">Naperville <br /></span> Locations,{' '}
                    <span className="opacity-40">Open Every</span> Day
                </>
            }
            subheading="Visit us on 75th Street or Ace Lane for expert service, everyday essentials, and weekend hours open 8 AM to 7 PM Friday through Saturday for your convenience."
        />
    );
}