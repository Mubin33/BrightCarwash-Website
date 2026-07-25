"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";

export function LocationsHeader() {
  return (
    <SectionHeader
      badgeIcon="car"
      badgeText="Find us now"
      heading={
        <p className="">
          Two Naperville <br /> Locations {' '}
          <span className="text-[#0098E8]">Open Every</span> Day
        </p>
      }
      subheading="Visit us on 75th Street or Ace Lane for expert service, everyday essentials, and weekend hours open 8 AM to 7 PM Friday through Saturday for your convenience."
    />
  );
}
