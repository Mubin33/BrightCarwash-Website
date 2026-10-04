import { createPageMetadata } from '@/lib/site';
import { FaqSectionWrapper } from "@/components/pages/home/faq/FaqSectionWrapper";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata(
    '/faq',
    'Frequently Asked Questions',
    'Find answers to frequently asked questions about Brightside Car Wash memberships, services, hours, detailing appointments, and more in Naperville.',
);

export default function FaqPage() {
  return (
    <main className="min-h-[70vh]">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "FAQ", href: "/faq" },
        ]}
      />
      <FaqSectionWrapper />
    </main>
  );
}
