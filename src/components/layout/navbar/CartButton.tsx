'use client';

import { Icon } from "@/components/ui/Icon";
import { useTheme } from '@/contexts/ThemeContext';
import { useBooking } from '@/contexts/BookingContext';
import Link from 'next/link';

export function CartButton() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const { selectedServices } = useBooking();
    const count = selectedServices.length;

    return (
        <Link href="/booking" className={`relative flex p-2 items-center justify-center w-10 h-10 rounded-lg border ${isDark ? 'border-white/20' : 'border-[#DFE1E7]'}`}>
            <Icon name="cart" width={20} height={20} color="#0098E8" />
            {count > 0 && (
                <span className="flex py-[6px] px-[9px] items-center gap-2 absolute -right-[11px] -top-[11px] rounded-[99px] bg-[#B23730] text-white font-inter text-xs font-medium">
                    {count}
                </span>
            )}
        </Link>
    );
}