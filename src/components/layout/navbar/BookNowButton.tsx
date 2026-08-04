"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

interface BookNowButtonProps {
  onClick?: () => void;
}

export function BookNowButton({ onClick }: BookNowButtonProps) {
  const pathname = usePathname();

  // Hide on booking-related pages
  if (pathname.startsWith("/booking")) return null;

  const handleClick = (e: React.MouseEvent) => {
    // Call the onClick prop to close sidebar if provided
    if (onClick) {
      onClick();
    }

    if (pathname === "/") {
      e.preventDefault();
      const section = document.getElementById("services");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "/services";
      }
    }
  };

  const isHome = pathname === "/";

  return (
    <Link
      href={isHome ? "#services" : "/services"}
      onClick={isHome ? handleClick : handleClick}
      className="flex py-3.5 px-5 justify-center items-center gap-2 rounded-lg bg-[#fec300] font-inter text-sm font-medium hover:bg-[#fec300]/90 transition-colors"
    >
      Book Now
      <Icon name="book" width={20} height={20} color="#000" />
    </Link>
  );
}