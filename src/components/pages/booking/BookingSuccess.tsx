'use client';

import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useBooking } from '@/contexts/BookingContext';
import { useTheme } from '@/contexts/ThemeContext';
import { format } from 'date-fns';

export function BookingSuccess() {
    const searchParams = useSearchParams();
    const { selectedServices } = useBooking();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const dateParam = searchParams.get('date');
    const timeParam = searchParams.get('time');
    const date = dateParam ? new Date(dateParam) : null;
    const dateDisplay = date ? format(date, 'MMMM d, yyyy') : '';
    const timeDisplay = timeParam || '';
    const serviceName = selectedServices[0]?.name || 'Car Wash Service';
    const duration = selectedServices[0]?.duration || '60 min';

    return (
        <div className={`flex w-full max-w-[648px] p-6 flex-col items-start gap-6 rounded-lg border ${isDark ? 'border-white/20 bg-white/[0.06]' : 'border-[#DFE1E7] bg-[#F8FAFB]'
            }`}>
            {/* Top Card */}
            <div className={`flex p-6 flex-col items-center gap-6 self-stretch rounded-xl border ${isDark ? 'border-white/20 bg-white/[0.04]' : 'border-[#DFE1E7] bg-white'
                }`}>
                {/* Check Icon */}
                <div className="w-20 h-20">
                    <Icon name="check-circle" width={80} height={80} color="" />
                </div>

                {/* Heading */}
                <h2 className={`text-center font-inter text-xl font-bold leading-normal ${isDark ? 'text-white' : 'text-[#1D1F2C]'
                    }`}>
                    Booking confirmed!
                </h2>

                {/* Subheading */}
                <p className={`text-center font-inter text-base font-normal leading-[150%] ${isDark ? 'text-white/60' : 'text-[#4A4C56]'
                    }`}>
                    A confirmation has been sent to your email address.
                </p>

                {/* Details */}
                <div className="flex py-2 px-3 flex-col items-start gap-3 self-stretch">
                    <div className="flex flex-col items-start gap-1">
                        <span className={`font-inter text-base font-medium leading-[100%] ${isDark ? 'text-white' : 'text-[#1D1F2C]'
                            }`}>
                            Date & Time
                        </span>
                        <span className={`font-inter text-sm font-normal leading-[112%] ${isDark ? 'text-white/50' : 'text-[#777980]'
                            }`}>
                            {dateDisplay}, {timeDisplay}
                        </span>
                    </div>
                    <div className="flex flex-col items-start gap-1">
                        <span className={`font-inter text-base font-medium leading-[100%] ${isDark ? 'text-white' : 'text-[#1D1F2C]'
                            }`}>
                            Service
                        </span>
                        <span className={`font-inter text-sm font-normal leading-[112%] ${isDark ? 'text-white/50' : 'text-[#777980]'
                            }`}>
                            {serviceName}
                        </span>
                    </div>
                    <div className="flex flex-col items-start gap-1">
                        <span className={`font-inter text-base font-medium leading-[100%] ${isDark ? 'text-white' : 'text-[#1D1F2C]'
                            }`}>
                            Duration
                        </span>
                        <span className={`font-inter text-sm font-normal leading-[112%] ${isDark ? 'text-white/50' : 'text-[#777980]'
                            }`}>
                            {duration}
                        </span>
                    </div>
                </div>

                {/* Square Security */}
                <div className="flex items-center gap-2">
                    <Icon name="square" width={16} height={16} color="#777980" />
                    <span className={`font-inter text-xs ${isDark ? 'text-white/40' : 'text-[#777980]'}`}>
                        Secured & encrypted by Square
                    </span>
                </div>
            </div>

            {/* Back to Home Button */}
            <Link href="/" className="w-full">
                <Button className="w-full py-4 px-6 justify-center items-center gap-2 rounded bg-[#0098E8] text-white font-inter text-sm">
                    Back to Home
                </Button>
            </Link>
        </div>
    );
}