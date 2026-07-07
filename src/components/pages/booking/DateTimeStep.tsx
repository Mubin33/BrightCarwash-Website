'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Calendar } from '@/components/ui/Calendar';
import { TimeSlotButton } from './TimeSlotButton';
import { useTheme } from '@/contexts/ThemeContext';

interface Props {
    onProceed: () => void;
    onBack: () => void;
}

const TIME_SLOTS: Record<string, string[]> = {
    Morning: ['08:00 AM', '09:00 AM', '10:00 AM'],
    Afternoon: ['12:00 PM', '01:00 PM', '02:00 PM'],
    Evening: ['04:00 PM', '05:00 PM', '06:00 PM'],
};

export function DateTimeStep({ onProceed, onBack }: Props) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dateParam = searchParams.get('date');
    const timeParam = searchParams.get('time');

    const [date, setDate] = useState<Date | undefined>(dateParam ? new Date(dateParam) : undefined);
    const [selectedTime, setSelectedTime] = useState<string | null>(timeParam || null);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const updateParams = (updates: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([k, v]) => params.set(k, v));
        router.push(`/booking?${params.toString()}`, { scroll: false });
    };

    const handleDateChange = (newDate: Date) => {
        setDate(newDate);
        updateParams({ date: newDate.toISOString().split('T')[0], ...(selectedTime && { time: selectedTime }) });
    };

    const handleTimeChange = (time: string) => {
        setSelectedTime(time);
        updateParams({ time, ...(date && { date: date.toISOString().split('T')[0] }) });
    };

    return (
        <div className={`flex flex-col lg:flex-row w-full p-4 sm:p-6 items-start gap-6 rounded-lg border ${isDark ? 'border-white/20 bg-white/[0.06]' : 'border-[#DFE1E7] bg-[#F8FAFB]'}`}>
            <div className={`flex p-4 flex-col items-center gap-3 self-stretch flex-1 rounded-xl border ${isDark ? 'border-white/10 bg-white/[0.04]' : 'border-[#D2D2D5] bg-white'}`}>
                <Calendar value={date} onChange={handleDateChange} isDark={isDark} />
                <div className="w-full h-px bg-[#DFE1E7] dark:bg-white/20" />
                <div className="flex flex-col items-start gap-2.5 self-stretch">
                    <span className={`font-inter text-base font-bold leading-normal ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>Timezone</span>
                    <div className="flex items-center gap-2">
                        <Icon name="globe" width={16} height={16} color="#4A4C56" />
                        <span className={`font-inter text-sm font-medium leading-normal ${isDark ? 'text-white/70' : 'text-[#4A4C56]'}`}>
                            {Intl.DateTimeFormat().resolvedOptions().timeZone}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-between items-start flex-1 self-stretch gap-6">
                <div className="flex flex-col items-start gap-3.5 self-stretch">
                    <h3 className={`self-stretch font-inter text-xl font-bold leading-normal ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>Select a time</h3>
                    <div className="flex flex-col items-start gap-[15px] self-stretch">
                        {Object.entries(TIME_SLOTS).map(([period, slots]) => (
                            <div key={period} className="flex flex-col items-start gap-3 self-stretch">
                                <span className={`font-inter text-base font-semibold leading-[150%] tracking-[0.16px] ${isDark ? 'text-white' : 'text-[#070707]'}`}>{period}</span>
                                <div className="flex items-start gap-[15px] self-stretch">
                                    {slots.map((time) => (
                                        <TimeSlotButton key={time} time={time} selected={selectedTime === time} isDark={isDark} onClick={() => handleTimeChange(time)} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex w-full gap-4">
                    <Button variant="outline" onClick={onBack} className={`flex-1 py-[14px] px-5 justify-center rounded-xl border font-inter text-sm ${isDark ? 'border-white/20 bg-white/[0.08] text-white' : 'border-[#DFE1E7] bg-[#F8FAFB] text-[#1B1B1B]'}`}>Back</Button>
                    <Button onClick={onProceed} disabled={!date || !selectedTime} className="flex-1 py-[14px] px-5 justify-center items-center gap-2 rounded-xl bg-[#0098E8] text-white font-inter text-sm disabled:opacity-50">Continue to checkout</Button>
                </div>
            </div>
        </div>
    );
}