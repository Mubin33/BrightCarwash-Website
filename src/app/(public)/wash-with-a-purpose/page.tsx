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
    </div>
  );
}
