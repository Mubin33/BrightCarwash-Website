'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
    value: Date | undefined;
    onChange: (date: Date) => void;
    isDark?: boolean;
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

export function Calendar({ value, onChange, isDark = false }: Props) {
    const today = new Date();
    const [viewDate, setViewDate] = useState(value || today);

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
            {/* Month Navigation */}
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

            {/* Day Names */}
            <div className="grid grid-cols-7 w-full">
                {DAY_NAMES.map((d) => (
                    <div key={d} className={`text-center font-inter text-xs font-medium py-2 ${isDark ? 'text-white/50' : 'text-[#777980]'}`}>
                        {d}
                    </div>
                ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-y-4 w-full">
                {Array.from({ length: totalCells }).map((_, i) => {
                    const day = i - firstDay + 1;
                    const valid = day > 0 && day <= daysInMonth;
                    const selected = valid && value && isSameDay(new Date(year, month, day), value);
                    const todayCell = valid && isSameDay(new Date(year, month, day), today);
                    const past = valid && isPast(day);

                    return (
                        <button
                            key={i}
                            type="button"
                            disabled={!valid || past}
                            onClick={() => valid && !past && handleSelect(day)}
                            className={`w-20 h-10 flex items-center justify-center text-sm font-inter rounded-4xl transition-colors mx-auto ${selected
                                ? 'bg-[#B23730] text-white'
                                : todayCell
                                    ? 'border-2 border-[#B23730] text-[#B23730]'
                                    : past || !valid
                                        ? `${isDark ? 'text-white/20' : 'text-[#D2D2D5]'} cursor-not-allowed`
                                        : isDark
                                            ? 'text-white hover:bg-white/10'
                                            : 'text-[#1D1F2C] hover:bg-[#F8FAFB]'
                                }`}
                        >
                            {valid ? day : ''}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}