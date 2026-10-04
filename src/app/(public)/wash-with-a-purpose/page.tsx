import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import HowTheProgramWorks from "@/components/pages/WashWithAPurpose/HowTheProgramWorks";
import PrepaidMembership from "@/components/pages/WashWithAPurpose/PrepaidMembership";
import ProudToPartnerWith from "@/components/pages/WashWithAPurpose/ProudToPartnerWith";
import WashWithAPurpose from "@/components/pages/WashWithAPurpose/WashWithAPurpose";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = createPageMetadata(
    '/wash-with-a-purpose',
    'Wash with a Purpose',
    'Support local organizations through the Brightside Car Wash Wash with a Purpose fundraising program.',
);

export default function page() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Wash with a Purpose", href: "/wash-with-a-purpose" },
        ]}
      />
      <WashWithAPurpose />
      <ProudToPartnerWith />
      <PrepaidMembership />
      <HowTheProgramWorks/>
    </div>
  );
}
