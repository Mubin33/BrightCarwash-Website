'use client';

import { Icon } from '@/components/ui/Icon';
import { useTheme } from '@/contexts/ThemeContext';

export function LocationsHeader() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="flex h-56 flex-col justify-end items-center gap-3 self-stretch">
            <div
                className={`flex py-[6px] px-3 items-center gap-3 rounded-lg border ${isDark
                    ? 'border-[#0098E8]/20 bg-[#0098E8]/[0.12]'
                    : 'border-[#DCA3A0] bg-[#F7EBEA]'
                    }`}
            >
                <Icon name="car" width={16} height={16} color={isDark ? '#0098E8'! : '#B23730'} />
                <span className={`font-inter text-sm font-normal leading-[112%] ${isDark ? 'text-[#0098E8]' : 'text-[#B23730]'}`}>
                    Find us now
                </span>
            </div>

            <h2 className={`w-[410px] text-center font-bebas-neue text-5xl font-normal leading-[116%] ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                Two <span className="text-[#B23730]">Naperville</span> Locations,{' '}
                <span className={isDark ? 'text-white/40' : 'text-[#1D1F2C]/40'}>Open Every</span>{' '}
                <span className={isDark ? 'text-white' : 'text-[#1D1F2C]'}>Day</span>
            </h2>

            <p className={`w-[638px] text-center font-inter text-base font-normal leading-[160%] ${isDark ? 'text-white/80' : 'text-[#4A4C56]'}`}>
                Visit one of our two convenient locations in Naperville. We're open every day of the week to serve you.
            </p>
        </div>
    );
}