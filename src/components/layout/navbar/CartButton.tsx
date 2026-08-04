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
      <Icon name="cart" width={24} height={24} color="#fec300" />
      {count > 0 && (
        <div className="flex justify-center  p-2 h-8 w-8 items-center gap-2 absolute -right-3.5 -top-3.5 rounded-full bg-[#B23730] text-white font-inter text-xs lg:text-base font-medium">
          <p>{count}</p>
        </div>
      )}
    </Link>
  );
}
