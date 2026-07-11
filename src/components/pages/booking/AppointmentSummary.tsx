// 'use client';

// import { useSearchParams } from 'next/navigation';
// import { Icon } from '@/components/ui/Icon';
// import { useBooking } from '@/contexts/BookingContext';
// import { useTheme } from '@/contexts/ThemeContext';
// import { format } from 'date-fns';

// export function AppointmentSummary() {
//     const searchParams = useSearchParams();
//     const { selectedServices } = useBooking();
//     const { theme } = useTheme();
//     const isDark = theme === 'dark';

//     const dateParam = searchParams.get('date');
//     const timeParam = searchParams.get('time');
//     const date = dateParam ? new Date(dateParam) : null;
//     const dayName = date ? format(date, 'EEEE') : '';
//     const dateDisplay = date ? format(date, 'MMMM d, yyyy') : '';

//     const subtotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
//     const tax = Math.round(subtotal * 0 * 100) / 100;
//     const total = subtotal + tax;
//     const deposit = Math.round(total * 0 * 100) / 100;
//     const dueAtAppointment = total - deposit;

//     return (
//         <div className={`flex p-3 sm:p-4 lg:p-6 flex-col items-center gap-4 sm:gap-6 self-stretch rounded-xl border ${isDark ? 'border-white/20 bg-white/[0.04]' : 'border-[#DFE1E7] bg-white'
//             }`}>
//             <h3 className={`font-inter text-lg sm:text-xl font-bold leading-normal self-stretch ${isDark ? 'text-white' : 'text-[#1D1F2C]'
//                 }`}>
//                 Appointment Summary
//             </h3>

//             {/* Date & Time */}
//             <div className={`flex flex-col sm:flex-row py-2 px-2 sm:px-3 justify-between items-start sm:items-center gap-2 self-stretch rounded-lg border ${isDark ? 'border-white/20 bg-white/[0.06]' : 'border-[#DFE1E7] bg-[#F8FAFB]'
//                 }`}>
//                 <div className="flex items-center gap-1.5 sm:gap-2">
//                     <Icon name="calendar" width={14} height={14} color="#0098E8" className="sm:w-4 sm:h-4 shrink-0" />
//                     <span className={`font-inter text-xs sm:text-sm lg:text-base font-normal leading-[150%] whitespace-nowrap ${isDark ? 'text-white/80' : 'text-[#4A4C56]'
//                         }`} suppressHydrationWarning>
//                         {dayName}, {dateDisplay}
//                     </span>
//                 </div>
//                 <div className="flex items-center gap-1.5 sm:gap-2">
//                     <Icon name="clock" width={14} height={14} color="#0098E8" className="sm:w-4 sm:h-4 shrink-0" />
//                     <span className={`font-inter text-xs sm:text-sm lg:text-base font-normal leading-[150%] whitespace-nowrap ${isDark ? 'text-white/80' : 'text-[#4A4C56]'
//                         }`}>
//                         {timeParam || '—'}
//                     </span>
//                 </div>
//             </div>

//             {/* Services */}
//             <div className="flex flex-col items-start gap-2 sm:gap-3 self-stretch">
//                 {selectedServices.map((s) => (
//                     <div key={s.id} className="flex justify-between items-center self-stretch gap-2">
//                         <span className={`font-inter text-xs sm:text-sm truncate ${isDark ? 'text-white/70' : 'text-[#4A4C56]'}`}>
//                             {s.name}
//                         </span>
//                         <span className="text-[#B23730] font-inter text-xs sm:text-sm font-bold shrink-0">${s.price}</span>
//                     </div>
//                 ))}
//             </div>

//             <div className={`w-full h-px ${isDark ? 'bg-white/20' : 'bg-[#DFE1E7]'}`} />

//             {/* Tax */}
//             <div className="flex justify-between items-center self-stretch">
//                 <span className={`font-inter text-xs sm:text-sm ${isDark ? 'text-white/60' : 'text-[#4A4C56]'}`}>Tax</span>
//                 <span className={`font-inter text-xs sm:text-sm ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>${tax}</span>
//             </div>

//             {/* Total */}
//             <div className="flex justify-between items-center self-stretch">
//                 <span className={`font-inter text-sm sm:text-base font-medium ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>Total</span>
//                 <span className="text-[#B23730] font-inter text-base sm:text-lg font-bold">${total}</span>
//             </div>

//             <div className={`w-full h-px ${isDark ? 'bg-white/20' : 'bg-[#DFE1E7]'}`} />

//             {/* Due Today */}
//             <div className="flex justify-between items-center self-stretch">
//                 <span className="font-inter text-xs sm:text-sm text-green-600 whitespace-nowrap">Due today</span>
//                 <span className="font-inter text-xs sm:text-sm font-medium text-green-600 whitespace-nowrap">${deposit}</span>
//             </div>

//             {/* Due at Appointment */}
//             <div className="flex justify-between items-center self-stretch">
//                 <span className="font-inter text-xs sm:text-sm text-red-600 whitespace-nowrap">Due at appointment</span>
//                 <span className="font-inter text-xs sm:text-sm font-medium text-red-600 whitespace-nowrap">${dueAtAppointment}</span>
//             </div>
//         </div>
//     );
// }


'use client';

import { useSearchParams } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';
import { useBooking } from '@/contexts/BookingContext';
import { useTheme } from '@/contexts/ThemeContext';
import { format } from 'date-fns';
import { useCartSummary } from '@/hooks/useCartSummary';

export function AppointmentSummary() {
    const searchParams = useSearchParams();
    const { selectedServices, selectedLocation } = useBooking();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const dateParam = searchParams.get('date');
    const timeParam = searchParams.get('time');
    const date = dateParam ? new Date(dateParam) : null;
    const dayName = date ? format(date, 'EEEE') : '';
    const dateDisplay = date ? format(date, 'MMMM d, yyyy') : '';

    const { summary } = useCartSummary(
        selectedLocation,
        selectedServices.map((s) => s.variationId)
    );

    const subtotal = summary ? summary.subtotalInCents / 100 : 0;
    const tax = summary ? summary.taxInCents / 100 : 0;
    const total = summary ? summary.totalInCents / 100 : 0;

    return (
        <div className={`flex p-3 sm:p-4 lg:p-6 flex-col items-center gap-4 sm:gap-6 self-stretch rounded-xl border ${isDark ? 'border-white/20 bg-white/[0.04]' : 'border-[#DFE1E7] bg-white'
            }`}>
            <h3 className={`font-inter text-lg sm:text-xl font-bold leading-normal self-stretch ${isDark ? 'text-white' : 'text-[#1D1F2C]'
                }`}>
                Appointment Summary
            </h3>

            {/* Date & Time */}
            <div className={`flex flex-col sm:flex-row py-2 px-2 sm:px-3 justify-between items-start sm:items-center gap-2 self-stretch rounded-lg border ${isDark ? 'border-white/20 bg-white/[0.06]' : 'border-[#DFE1E7] bg-[#F8FAFB]'
                }`}>
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <Icon name="calendar" width={14} height={14} color="#0098E8" className="sm:w-4 sm:h-4 shrink-0" />
                    <span className={`font-inter text-xs sm:text-sm lg:text-base font-normal leading-[150%] whitespace-nowrap ${isDark ? 'text-white/80' : 'text-[#4A4C56]'
                        }`}>
                        {dayName}, {dateDisplay}
                    </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <Icon name="clock" width={14} height={14} color="#0098E8" className="sm:w-4 sm:h-4 shrink-0" />
                    <span className={`font-inter text-xs sm:text-sm lg:text-base font-normal leading-[150%] whitespace-nowrap ${isDark ? 'text-white/80' : 'text-[#4A4C56]'
                        }`}>
                        {timeParam || '—'}
                    </span>
                </div>
            </div>

            {/* Services */}
            <div className="flex flex-col items-start gap-2 sm:gap-3 self-stretch">
                {selectedServices.map((s) => (
                    <div key={s.id} className="flex justify-between items-center self-stretch gap-2">
                        <span className={`font-inter text-xs sm:text-sm truncate ${isDark ? 'text-white/70' : 'text-[#4A4C56]'}`}>
                            {s.name}
                        </span>
                        <span className="text-[#B23730] font-inter text-xs sm:text-sm font-bold shrink-0">${s.price}</span>
                    </div>
                ))}
            </div>

            <div className={`w-full h-px ${isDark ? 'bg-white/20' : 'bg-[#DFE1E7]'}`} />

            {/* Tax */}
            <div className="flex justify-between items-center self-stretch">
                <span className={`font-inter text-xs sm:text-sm ${isDark ? 'text-white/60' : 'text-[#4A4C56]'}`}>Tax</span>
                <span className={`font-inter text-xs sm:text-sm ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>${tax.toFixed(2)}</span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center self-stretch">
                <span className={`font-inter text-sm sm:text-base font-medium ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>Total</span>
                <span className="text-[#B23730] font-inter text-base sm:text-lg font-bold">${total.toFixed(2)}</span>
            </div>
        </div>
    );
}