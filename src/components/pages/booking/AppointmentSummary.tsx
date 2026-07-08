'use client';

import { useSearchParams } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';
import { useBooking } from '@/contexts/BookingContext';
import { useTheme } from '@/contexts/ThemeContext';
import { format } from 'date-fns';

export function AppointmentSummary() {
    const searchParams = useSearchParams();
    const { selectedServices } = useBooking();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const dateParam = searchParams.get('date');
    const timeParam = searchParams.get('time');
    const date = dateParam ? new Date(dateParam) : null;
    const dayName = date ? format(date, 'EEEE') : '';
    const dateDisplay = date ? format(date, 'MMMM d, yyyy') : '';

    const subtotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
    const tax = Math.round(subtotal * 0.0875 * 100) / 100;
    const total = subtotal + tax;
    const deposit = Math.round(total * 0.25 * 100) / 100;
    const dueAtAppointment = total - deposit;

    return (
        <div className={`flex p-4 sm:p-6 flex-col items-center gap-6 self-stretch rounded-xl border ${isDark ? 'border-white/20 bg-white/[0.04]' : 'border-[#DFE1E7] bg-white'}`}>
            <h3 className={`font-inter text-xl font-bold leading-normal self-stretch ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                Appointment Summary
            </h3>

            {/* Date & Time */}
            <div className={`flex py-2 px-3 justify-between items-start self-stretch rounded-lg border ${isDark ? 'border-white/20 bg-white/[0.06]' : 'border-[#DFE1E7] bg-[#F8FAFB]'}`}>
                <div className="flex items-center gap-2">
                    <Icon name="calendar" width={16} height={16} color="#0098E8" />
                    <span className={`font-inter text-base font-normal leading-[150%] ${isDark ? 'text-white/80' : 'text-[#4A4C56]'}`}>
                        {dayName}, {dateDisplay}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Icon name="clock" width={16} height={16} color="#0098E8" />
                    <span className={`font-inter text-base font-normal leading-[150%] ${isDark ? 'text-white/80' : 'text-[#4A4C56]'}`}>
                        {timeParam || '—'}
                    </span>
                </div>
            </div>

            {/* Services */}
            <div className="flex flex-col items-start gap-3 self-stretch">
                {selectedServices.map((s) => (
                    <div key={s.id} className="flex justify-between items-center self-stretch">
                        <span className={`font-inter text-sm ${isDark ? 'text-white/70' : 'text-[#4A4C56]'}`}>
                            {s.name}
                        </span>
                        <span className="text-[#B23730] font-inter text-sm font-bold">${s.price}</span>
                    </div>
                ))}
            </div>

            <div className="w-full h-px bg-[#DFE1E7] dark:bg-white/20" />

            {/* Tax */}
            <div className="flex justify-between items-center self-stretch">
                <span className={`font-inter text-sm ${isDark ? 'text-white/70' : 'text-[#4A4C56]'}`}>Tax</span>
                <span className={`font-inter text-sm ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>${tax}</span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center self-stretch">
                <span className={`font-inter text-base font-medium ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>Total</span>
                <span className="text-[#B23730] font-inter text-lg font-bold">${total}</span>
            </div>

            <div className="w-full h-px bg-[#DFE1E7] dark:bg-white/20" />

            {/* Due Today */}
            <div className="flex justify-between items-center self-stretch">
                <span className={`font-inter text-sm text-green-600`}>Due today</span>
                <span className={`font-inter text-sm font-medium text-green-600`}>${deposit}</span>
            </div>

            {/* Due at Appointment */}
            <div className="flex justify-between items-center self-stretch">
                <span className={`font-inter text-sm text-red-600`}>Due at appointment</span>
                <span className={`font-inter text-sm font-medium text-red-600`}>${dueAtAppointment}</span>
            </div>
        </div>
    );
}