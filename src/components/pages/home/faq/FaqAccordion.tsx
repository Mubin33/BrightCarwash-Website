'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '@/data/faq';

interface Props {
    item: FaqItem;
}

export function FaqAccordion({ item }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div
            className={`self-stretch p-6 rounded-lg inline-flex justify-between items-start cursor-pointer transition-colors ${isOpen
                ? 'bg-yellow-50 outline outline-offset-[-1.50px] outline-yellow-400'
                : isDark
                    ? 'bg-white/4 outline-1 -outline-offset-1 outline-white/20'
                    : 'bg-white outline-1 -outline-offset-1 outline-zinc-200'
                }`}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="flex-1 flex flex-col justify-start items-start gap-2">
                <div
                    className={`justify-start text-2xl font-normal font-['Bebas_Neue'] leading-6 tracking-wide ${isOpen
                        ? 'text-neutral-800'
                        : isDark
                            ? 'text-white'
                            : 'text-neutral-800'
                        }`}
                >
                    {item?.question || ''}
                </div>
                {isOpen && (
                    <div
                        className={`self-stretch justify-start text-base font-medium font-['Inter'] leading-6 ${isDark ? 'text-black/60' : 'text-neutral-600'
                            }`}
                    >
                        {item?.answer}
                    </div>
                )}
            </div>
            <ChevronDown
                size={24}
                color={isDark ? '#525252' : '#525252'}
                className={`shrink-0 mt-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                    }`}
            />
        </div>
    );
}