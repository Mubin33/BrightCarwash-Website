import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import React from "react";

export const metadata: Metadata = createPageMetadata(
    '/buy-membership',
    'Buy a Membership',
    'Join Brightside Car Wash and enjoy unlimited washes with our membership plans in Naperville.',
);

export default function BuyMembershipPage() {
  return (
    <div className="bg-[#f5f5f5] h-screen">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Buy Membership", href: "/buy-membership" },
        ]}
      />
      <div className="max-w-2xl mx-auto bg-white rounded-lg p-4 mt-10 ">
        <div className="p-4 bg-[#092544] rounded-lg">
          <h1 className="text-white text-[2rem] text-center uppercase font-bebas">
            Buy a Membership
          </h1>
          <p className="text-[#d5d5d5] text-base text-center lg:w-[45ch] mx-auto">
            Join Brightside Car Wash and enjoy unlimited washes with our
            membership plans.
          </p>
        </div>
        <div className="w-full rounded-lg overflow-hidden mt-5">
          <iframe
            sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
            referrerPolicy="no-referrer"
            title="Buy a Membership"
            loading="lazy"
            src="https://app.flexwash.com/sign-up-portal/location-and-package?organizationId=264"
            style={{ width: "100%", minHeight: "400px", border: "none" }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
