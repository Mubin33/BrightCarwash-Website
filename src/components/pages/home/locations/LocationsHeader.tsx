'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';

export function LocationsHeader() {
    return (
        <SectionHeader
            badgeIcon="car"
            badgeText="Find us now"
            heading={
                <>
                    Two <span className="text-[#B23730]">Naperville</span> Locations,{' '}
                    <span className="opacity-40">Open Every</span> Day
                </>
            }
            subheading="Visit one of our two convenient locations in Naperville. We're open every day of the week to serve you."
        />
    );
}