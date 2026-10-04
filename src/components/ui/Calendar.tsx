'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/** Date values represent UTC calendar days. */
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
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
    return new Date(Date.UTC(year, month, 1)).getUTCDay();
}

function isSameDay(a: Date, b: Date): boolean {
    return a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth() && a.getUTCDate() === b.getUTCDate();
}

export function Calendar({ value, onChange, isDark = false, availableDates = [] }: Props) {
    const today = new Date();
    const [viewDate, setViewDate] = useState(value || today);

    const [previousValue, setPreviousValue] = useState(value);
    if (value !== previousValue) {
        setPreviousValue(value);
        if (value) setViewDate(value);
    }

    const year = viewDate.getUTCFullYear();
    const month = viewDate.getUTCMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

    const handlePrevMonth = () => setViewDate(new Date(Date.UTC(year, month - 1, 1)));
    const handleNextMonth = () => setViewDate(new Date(Date.UTC(year, month + 1, 1)));

    const handleSelect = (day: number) => {
        const newDate = new Date(Date.UTC(year, month, day));
        onChange(newDate);
    };

    const isPast = (day: number) => {
        const d = new Date(Date.UTC(year, month, day));
        const todayStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
        return d < todayStart;
    };

    return (
        <div role="group" aria-label="Choose an appointment date (UTC)" className="flex flex-col items-center gap-3 self-stretch">
            <div className="flex items-center justify-between self-stretch">
                <button type="button" aria-label="Previous month" onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded transition-colors">
                    <ChevronLeft size={20} className={isDark ? 'text-white' : 'text-[#1D1F2C]'} />
                </button>
                <span aria-live="polite" aria-atomic="true" className={`font-inter text-base font-semibold ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                    {MONTHS[month]} {year}
                </span>
                <button type="button" aria-label="Next month" onClick={handleNextMonth} className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded transition-colors">
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
                    const selected = valid && value && isSameDay(new Date(Date.UTC(year, month, day)), value);
                    const todayCell = valid && isSameDay(new Date(Date.UTC(year, month, day)), today);
                    const past = valid && isPast(day);
                    const dateStr = valid ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : '';
                    const hasSlots = availableDates.includes(dateStr);
                    const noSlotsAvailable = valid && !past && !hasSlots && availableDates.length > 0;

                    if (!valid) return <span key={i} aria-hidden="true" />;

                    return (
                        <button
                            key={i}
                            type="button"
                            aria-label={`${MONTHS[month]} ${day}, ${year}${past ? ', past date' : noSlotsAvailable ? ', no available appointments' : hasSlots ? ', appointments available' : ''}`}
                            aria-pressed={Boolean(selected)}
                            aria-current={todayCell ? 'date' : undefined}
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