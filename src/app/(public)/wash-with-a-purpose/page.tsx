import { Breadcrumb } from "@/components/ui/Breadcrumb";
import React from "react";

export default function page() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Wash with a Purpose", href: "/wash-with-a-purpose" },
        ]}
      />
    </div>
  );
}
