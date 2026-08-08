import HowTheProgramWorks from "@/components/pages/WashWithAPurpose/HowTheProgramWorks";
import PrepaidMembership from "@/components/pages/WashWithAPurpose/PrepaidMembership";
import ProudToPartnerWith from "@/components/pages/WashWithAPurpose/ProudToPartnerWith";
import WashWithAPurpose from "@/components/pages/WashWithAPurpose/WashWithAPurpose";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

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
      {/* <HowTheProgramWorks/> */}
    </div>
  );
}
