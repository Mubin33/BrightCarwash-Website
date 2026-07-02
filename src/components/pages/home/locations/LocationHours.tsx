'use client';
import { useTheme } from '@/contexts/ThemeContext';
interface Props {
    hours: { days: string; time: string }[];
}
export function LocationHours({ hours }: Props) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    return (
        <div
            className={`flex p-4 sm:p-6 items-center gap-6 self-stretch rounded-lg border w-full max-w-[1320px] ${isDark ? 'border-white/20 bg-white/[0.12]' : 'border-[#DFE1E7] bg-white'
                }`}
        >
            <div className="flex flex-wrap sm:flex-nowrap justify-around items-center gap-4 flex-1">
                {hours.map((h) => (
                    <div key={h.days} className="flex flex-col items-center gap-2">
                        <span className={`font-inter text-base sm:text-xl lg:text-2xl font-medium text-center ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                            {h.days}
                        </span>
                        <span className={`font-inter text-xs sm:text-sm ${isDark ? 'text-white/70' : 'text-[#777980]'}`}>
                            {h.time}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}