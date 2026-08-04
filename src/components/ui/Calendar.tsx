'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
    value: Date | undefined;
    onChange: (date: Date) => void;
    isDark?: boolean;
    availableDates?: string[];
}

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function Calendar({ value, onChange, isDark = false, availableDates = [] }: Props) {
    const today = new Date();
    const [viewDate, setViewDate] = useState(value || today);

    useEffect(() => {
        if (value) {
            setViewDate(value);
        }
    }, [value]);

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

    const handlePrevMonth = () => setViewDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setViewDate(new Date(year, month + 1, 1));

    const handleSelect = (day: number) => {
        const newDate = new Date(year, month, day);
        onChange(newDate);
    };

    const isPast = (day: number) => {
        const d = new Date(year, month, day);
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        return d < todayStart;
    };

    return (
        <div className="flex flex-col items-center gap-3 self-stretch">
            <div className="flex items-center justify-between self-stretch">
                <button type="button" onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded transition-colors">
                    <ChevronLeft size={20} className={isDark ? 'text-white' : 'text-[#1D1F2C]'} />
                </button>
                <span className={`font-inter text-base font-semibold ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                    {MONTHS[month]} {year}
                </span>
                <button type="button" onClick={handleNextMonth} className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded transition-colors">
                    <ChevronRight size={20} className={isDark ? 'text-white' : 'text-[#1D1F2C]'} />
                </button>
            </div>

            <div className="grid grid-cols-7 w-full">
                {DAY_NAMES.map((d) => (
                    <div key={d} className={`text-center font-inter text-xs font-medium py-2 ${isDark ? 'text-white/50' : 'text-[#777980]'}`}>
                        {d}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-y-4 w-full">
                {Array.from({ length: totalCells }).map((_, i) => {
                    const day = i - firstDay + 1;
                    const valid = day > 0 && day <= daysInMonth;
                    const selected = valid && value && isSameDay(new Date(year, month, day), value);
                    const todayCell = valid && isSameDay(new Date(year, month, day), today);
                    const past = valid && isPast(day);
                    const dateStr = valid ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : '';
                    const hasSlots = availableDates.includes(dateStr);
                    const noSlotsAvailable = valid && !past && !hasSlots && availableDates.length > 0;

                    return (
                        <button
                            key={i}
                            type="button"
                            disabled={!valid || past || noSlotsAvailable}
                            onClick={() => valid && !past && !noSlotsAvailable && handleSelect(day)}
                            className={`cursor-pointer relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-xs sm:text-sm font-inter rounded-full transition-colors mx-auto ${selected
                                ? 'bg-[#FEC300] text-black'
                                : todayCell
                                    ? 'border-2 border-[#FEC300] text-[#FEC300]'
                                    : past || !valid || noSlotsAvailable
                                        ? `${isDark ? 'text-white/20' : 'text-[#D2D2D5]'} cursor-not-allowed`
                                        : isDark
                                            ? 'text-white hover:bg-white/10'
                                            : 'text-[#1D1F2C] hover:bg-[#F8FAFB]'
                                }`}
                        >
                            {valid ? day : ''}
                            {hasSlots && !selected && (
                                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0098E8]" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}