'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useBooking } from '@/contexts/BookingContext';

export function BookingSummary() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const { selectedServices } = useBooking();

    const total = selectedServices.reduce((sum, s) => sum + s.price, 0);

    return (
        <div className={`flex p-4 sm:p-6 flex-col items-center gap-4 self-stretch rounded-xl border ${isDark ? 'border-white/20 bg-white/[0.04]' : 'border-[#DFE1E7] bg-white'}`}>
            <h3 className={`font-inter text-xl font-bold leading-normal self-stretch ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                Booking Summary
            </h3>

            {selectedServices.map((s) => (
                <div key={s.id} className="flex justify-between items-center self-stretch">
                    <span className={`font-inter text-sm ${isDark ? 'text-white/80' : 'text-[#4A4C56]'}`}>
                        {s.name}
                    </span>
                    <span className="text-[#B23730] font-inter text-sm font-bold">${s.price}</span>
                </div>
            ))}

            <div className="w-full h-px bg-[#DFE1E7] dark:bg-white/20" />

            <div className="flex justify-between items-center self-stretch">
                <span className={`font-inter text-base font-medium ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                    Total
                </span>
                <span className="text-[#B23730] font-inter text-lg font-bold">${total}</span>
            </div>
        </div>
    );
}