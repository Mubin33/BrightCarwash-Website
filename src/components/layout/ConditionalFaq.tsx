"use client";

import { FaqSection } from "@/components/pages/home/all-sections/FaqSection";
import { usePathname } from "next/navigation";

export function ConditionalFaq() {
  const pathname = usePathname();

  if (
    pathname.startsWith("/booking") ||
    pathname === "/faq" ||
    pathname.startsWith("/faq/")
  )
    return null;

  return <FaqSection />;
}
