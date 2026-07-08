'use client';

import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

export function BookingSuccess() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="flex flex-col items-center gap-6 py-16 self-stretch">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#DCF7EA] flex items-center justify-center">
                <Icon name="check" width={24} height={24} color="#006F1F" className="sm:w-8 sm:h-8" />
            </div>
            <h2 className={`font-bebas-neue text-3xl sm:text-4xl font-normal ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                Booking Confirmed!
            </h2>
            <p className={`font-inter text-sm sm:text-base text-center max-w-md ${isDark ? 'text-white/70' : 'text-[#777980]'}`}>
                Your appointment has been booked successfully. A confirmation email has been sent to your email address.
            </p>
            <Link href="/">
                <Button className="py-[14px] px-5 rounded-lg bg-[#0098E8] text-white font-inter text-sm">
                    Back to Home
                </Button>
            </Link>
        </div>
    );
}