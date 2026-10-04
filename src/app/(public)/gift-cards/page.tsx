import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import React from "react";

export const metadata: Metadata = createPageMetadata(
    '/gift-cards',
    'Gift Cards',
    'Give the gift of a clean car with Brightside Car Wash gift cards.',
);

export default function GiftCardsPage() {
  return (
    <div className="bg-[#f5f5f5] h-screen">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Gift Cards", href: "/gift-cards" },
        ]}
      />
      <div className="max-w-2xl mx-auto bg-white rounded-lg p-4 mt-10 ">
        <div className="p-4 bg-[#092544] rounded-lg">
          <h1 className="text-white text-[2rem] text-center uppercase font-bebas">
            Gift Cards
          </h1>
          <p className="text-[#d5d5d5] text-base text-center lg:w-[45ch] mx-auto">
            Give the gift of a clean car.
          </p>
        </div>
        <div className="w-full rounded-lg overflow-hidden mt-5">
          <iframe
            sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
            referrerPolicy="no-referrer"
            src="https://app.flexwash.com/purchase-portal?organizationId=264&amp;carWashId=267&amp;packageId=5773&amp;denominations=2900%2C3900%2C4900%2C10000%2C20000%2C30000"
            className="w-full min-h-100 border-0"
            title="Purchase Gift Cards"
            loading="lazy"
            spellCheck="false"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
