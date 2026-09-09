import { usePathname } from "next/navigation";
import { FaqSectionWrapper } from "../faq/FaqSectionWrapper";

export function FaqSection() {
  const pathname = usePathname();

  return pathname === "/wash-with-a-purpose" ? null : <FaqSectionWrapper />;
}
