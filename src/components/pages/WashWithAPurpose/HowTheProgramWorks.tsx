import { SectionHeader } from "@/components/ui/SectionHeader";
import React from "react";

export default function HowTheProgramWorks() {
  return (
    <div className="bg-[#fff8ee] dark:bg-[#1a1a1a] py-10 lg:py-20">
      <div className="max-w-330 mx-auto px-4 xl:px-0">
        <SectionHeader
          badgeIcon="car"
          badgeText="The Good-to-Know Stuff"
          forceDark
          heading={
            <p className="text-[#0B1220] dark:text-white">
              How the Program Works
            </p>
          }
          subheading={
            <p className="text-[#0B1220] dark:text-white/90">
              No surprises here just the friendly fine print for your 90-Day
              Better Full-Service Membership.
            </p>
          }
        />
      </div>
    </div>
  );
}
