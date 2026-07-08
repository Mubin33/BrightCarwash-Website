'use client';

import { Icon } from '@/components/ui/Icon';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
    const { toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="flex w-16 h-8 p-1 items-center rounded-[132px] relative transition-colors border border-[#DFE1E7] bg-[#F8FAFB] dark:border-white/20 dark:bg-white/[0.12]"
        >
            <div className="absolute left-1 top-0.5 w-6.5 h-6.5 rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center translate-x-0 dark:translate-x-8">
                <Icon name="sun" width={16} height={16} className="block dark:hidden" />
                <Icon name="moon" width={16} height={16} className="hidden dark:block" />
            </div>
        </button>
    );
}