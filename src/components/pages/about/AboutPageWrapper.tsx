"use client";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { AboutHero } from "./AboutHero";
import { LeadershipSection } from "./LeadershipSection";
import { WhoWeAre } from "./WhoWeAre";
import { WhyBrightside } from "./WhyBrightside";

export function AboutPageWrapper() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about-us" },
        ]}
      />
      <AboutHero />
      <LeadershipSection />
      <WhoWeAre />
      <WhyBrightside />
    </div>
  );
}
