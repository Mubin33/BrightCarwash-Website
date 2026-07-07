'use client';

import { Icon } from '@/components/ui/Icon';
import { useTheme } from '@/contexts/ThemeContext';

interface Props {
    currentStep: 'cart' | 'datetime' | 'checkout';
    onStepChange: (step: 'cart' | 'datetime' | 'checkout') => void;
}

const steps = [
    { key: 'cart', icon: 'cart', label: 'Cart' },
    { key: 'datetime', icon: 'calendar', label: 'Date & Time' },
    { key: 'checkout', icon: 'checkout', label: 'Checkout' },
] as const;

export function BookingSteps({ currentStep, onStepChange }: Props) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="flex justify-center items-center self-stretch">
            <div
                className={`flex w-full max-w-[872px] p-3 items-center gap-0.5 rounded-full border ${isDark ? 'border-white/20 bg-white/[0.06]' : 'border-[#DFE1E7] bg-[#F8FAFB]'
                    }`}
            >
                {steps.map((s) => (
                    <button
                        key={s.key}
                        type="button"
                        onClick={() => onStepChange(s.key)}
                        className={`flex py-2 px-3 justify-center items-center gap-3 flex-1 self-stretch rounded-full font-inter text-sm font-medium transition-colors ${currentStep === s.key
                            ? 'bg-[#B23730] text-white'
                            : isDark
                                ? 'text-white/60 hover:text-white'
                                : 'text-[#777980] hover:text-[#1B1B1B]'
                            }`}
                    >
                        <Icon
                            name={s.icon}
                            width={16}
                            height={16}
                            color={currentStep === s.key ? '#FFFFFF' : isDark ? '#FFFFFF' : '#777980'}
                        />
                        {s.label}
                    </button>
                ))}
            </div>
        </div>
    );
}