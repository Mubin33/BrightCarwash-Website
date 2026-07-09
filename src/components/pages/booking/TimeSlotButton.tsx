'use client';

interface Props {
    time: string;
    selected: boolean;
    isDark: boolean;
    onClick: () => void;
}

export function TimeSlotButton({ time, selected, isDark, onClick }: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex w-full py-2 sm:py-2 px-6 justify-center sm:justify-between items-center rounded-lg border text-xs sm:text-sm font-inter transition-colors ${selected
                ? 'border-[#B23730] bg-[#F7EBEA] text-[#B23730]'
                : isDark
                    ? 'border-white/20 bg-white/[0.06] text-white'
                    : 'border-[#DFE1E7] bg-white text-[#1D1F2C] hover:border-[#0098E8]'
                }`}
        >
            {time}
        </button>
    );
}