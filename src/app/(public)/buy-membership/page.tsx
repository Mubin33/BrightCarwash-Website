import { Breadcrumb } from "@/components/ui/Breadcrumb";
import React from "react";

export default function BuyMembershipPage() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Buy Membership", href: "/buy-membership" },
        ]}
      />
      <div>
        
      </div>
    </div>
  );
}
