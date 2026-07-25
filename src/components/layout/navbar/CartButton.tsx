"use client";

import { Icon } from "@/components/ui/Icon";
import { useBooking } from "@/contexts/BookingContext";
import Link from "next/link";

export function CartButton() {
  const { selectedServices } = useBooking();
  const count = selectedServices.length;

  return (
    <Link
      href="/booking"
      className="relative flex p-2 items-center justify-center rounded-lg border border-white/20"
    >
      <Icon name="cart" width={32} height={32} color="#fec300" />
      {count > 0 && (
        <span className="flex py-[6px] px-[9px] items-center gap-2 absolute -right-[11px] -top-[11px] rounded-[99px] bg-[#B23730] text-white font-inter text-xs font-medium">
          {count}
        </span>
      )}
    </Link>
  );
}
