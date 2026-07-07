'use client';

import { Icon } from '@/components/ui/Icon';
import { useTheme } from '@/contexts/ThemeContext';

interface StepData {
    number: string;
    title: string;
    description: string;
}

interface Props {
    step: StepData;
}

const STEP_ICONS: Record<string, string> = {
    '01': 'package',
    '02': 'form',
    '03': 'deposit',
    '04': 'drive',
};

export function StepCard({ step }: Props) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div
            className={`flex p-4 flex-col justify-center items-start gap-6 flex-1 rounded-lg border ${isDark
                ? 'border-white/20 bg-white/[0.12]'
                : 'border-[#DFE1E7] bg-[#F8FAFB]'
                }`}
        >
            {/* Header Row */}
            <div className="flex justify-between items-center self-stretch">
                {/* Icon */}
                <div
                    className={`flex p-2 items-center gap-3 rounded-lg border ${isDark
                        ? 'border-white/20 bg-white/[0.12]'
                        : 'border-[#E8E8E9] bg-white'
                        }`}
                >
                    <Icon
                        name={STEP_ICONS[step.number] || 'car'}
                        width={24}
                        height={24}
                        color={isDark ? '#0098E8' : '#B23730'}
                    />
                </div>

                {/* Number */}
                <span
                    className={`font-bebas text-5xl font-normal leading-[100%] ${isDark ? 'text-white opacity-40' : 'text-[#B23730]/40'
                        }`}
                >
                    {step.number}
                </span>
            </div>

            {/* Title */}
            <h3 className={`font-bebas self-stretch text-xl sm:text-2xl font-normal leading-[100%] ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                {step.title}
            </h3>

            <p className={`self-stretch font-inter text-sm sm:text-base font-normal leading-[160%] ${isDark ? 'text-white/80' : 'text-[#4A4C56]'}`}>
                {step.description}
            </p>
        </div>
    );
}