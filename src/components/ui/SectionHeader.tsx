'use client';

import { Icon } from '@/components/ui/Icon';
import { useTheme } from '@/contexts/ThemeContext';

interface Props {
    badgeIcon: string;
    badgeText: string;
    heading: React.ReactNode;
    subheading: string;
}

export function SectionHeader({ badgeIcon, badgeText, heading, subheading }: Props) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="flex min-h-[auto] lg:h-56 flex-col justify-end items-center gap-3 self-stretch">
            <div
                className={`flex py-[6px] px-3 items-center gap-3 rounded-lg border ${isDark
                    ? 'border-[#0098E8]/20 bg-[#0098E8]/[0.12]'
                    : 'border-[#DCA3A0] bg-[#F7EBEA]'
                    }`}
            >
                <Icon
                    name={badgeIcon}
                    width={16}
                    height={16}
                    color={isDark ? '#0098E8' : '#B23730'}
                />
                <span
                    className={`font-bebas text-sm font-normal leading-[112%] ${isDark ? 'text-[#0098E8]' : 'text-[#B23730]'
                        }`}
                >
                    {badgeText}
                </span>
            </div>

            <h2
                className={`font-bebas w-full sm:w-[380px] lg:w-[410px] text-center font-bebas-neue text-3xl sm:text-4xl lg:text-5xl font-normal leading-[116%] ${isDark ? 'text-white' : 'text-[#1D1F2C]'
                    }`}
            >
                {heading}
            </h2>

            <p
                className={`w-full sm:w-[500px] lg:w-[638px] text-center font-inter text-sm sm:text-base font-normal leading-[160%] ${isDark ? 'text-white/80' : 'text-[#4A4C56]'
                    }`}
            >
                {subheading}
            </p>
        </div>
    );
}