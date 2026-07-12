'use client';

import { TimeSlotButton } from './TimeSlotButton';
import { format } from 'date-fns';
import type { AvailabilitySlot } from '@/services/booking.api';

interface Props {
    slots: AvailabilitySlot[];
    timeSlots: Record<string, AvailabilitySlot[]>;
    cacheLoading: boolean;
    dateLoading: boolean;
    date: Date | undefined;
    selectedTime: string | null;
    isDark: boolean;
    onTimeChange: (slot: AvailabilitySlot) => void;
}

export function TimeSlotList({ slots, timeSlots, cacheLoading, dateLoading, date, selectedTime, isDark, onTimeChange }: Props) {
    return (
        <div className="flex flex-col items-start gap-3.5 self-stretch">
            <h3 className={`self-stretch font-inter text-xl font-bold leading-normal ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>Select a time</h3>
            {cacheLoading || dateLoading ? (
                <div className="flex items-center justify-center py-12 self-stretch"><div className="w-6 h-6 border-2 border-[#0098E8] border-t-transparent rounded-full animate-spin" /></div>
            ) : slots.length === 0 && date ? (
                <p className={`font-inter text-sm ${isDark ? 'text-white/50' : 'text-[#A5A5AB]'}`}>No available slots for this date.</p>
            ) : (
                <div className="flex flex-col items-start gap-[15px] self-stretch">
                    {Object.entries(timeSlots).map(([period, periodSlots]) =>
                        periodSlots.length > 0 ? (
                            <div key={period} className="flex flex-col items-start gap-3 self-stretch">
                                <span className={`font-inter text-base font-semibold leading-[150%] tracking-[0.16px] ${isDark ? 'text-white' : 'text-[#070707]'}`}>{period}</span>
                                <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-3">
                                    {periodSlots.map((slot) => {
                                        const time = format(new Date(slot.startAt), 'hh:mm a');
                                        return <TimeSlotButton key={slot.startAt} time={time} selected={selectedTime === time} isDark={isDark} onClick={() => onTimeChange(slot)} />;
                                    })}
                                </div>
                            </div>
                        ) : null
                    )}
                </div>
            )}
        </div>
    );
}