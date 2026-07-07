'use client';

import { Icon } from "@/components/ui/Icon";
import { useTheme } from '@/contexts/ThemeContext';

interface Props {
    count?: number;
}

export function CartButton({ count = 0 }: Props) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            type="button"
            className={`relative flex p-2 items-center justify-center w-10 h-10 rounded-lg border ${isDark ? 'border-white/20 bg-white/[0.12]' : 'border-[#DFE1E7] bg-white'
                }`}
        >
            <Icon name="cart" width={20} height={20} color="#0098E8" />
            {count > 0 && (
                <span className="flex py-[6px] px-[9px] items-center gap-2 absolute -right-[11px] -top-[11px] rounded-[99px] bg-[#B23730] text-white font-inter text-xs font-medium">
                    {count}
                </span>
            )}
        </button>
    );
}