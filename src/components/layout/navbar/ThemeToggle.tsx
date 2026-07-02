'use client';

import { Icon } from '@/components/ui/Icon';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className={`flex w-16 h-8 p-1 items-center rounded-[132px] relative transition-colors ${isDark
                    ? 'border border-white/20 bg-white/[0.12]'
                    : 'border border-[#DFE1E7] bg-[#F8FAFB]'
                }`}
        >
            <div
                className={`absolute top-0.5 w-7 h-7 rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center ${isDark ? 'translate-x-8' : 'translate-x-0'
                    }`}
            >
                <Icon
                    name={isDark ? 'moon' : 'sun'}
                    width={16}
                    height={16}
                    color={isDark ? '#777980' : '#FFAF00'}
                />
            </div>
        </button>
    );
}