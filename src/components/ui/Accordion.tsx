'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface Props {
    question: string;
    answer: string;
    questionClassName?: string;
    answerClassName?: string;
    expandedClassName?: string;
    collapsedClassName?: string;
}

export function Accordion({
    question,
    answer,
    questionClassName = '',
    answerClassName = '',
    expandedClassName = '',
    collapsedClassName = '',
}: Props) {
    const [expanded, setExpanded] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className={`flex p-6 justify-between items-center self-stretch rounded-lg border text-left transition-colors ${expanded
                    ? isDark
                        ? `border-[#B23730]/40 bg-[#B23730]/[0.12] rounded-xl ${expandedClassName}`
                        : `border-[#B23730] bg-[#F7EBEA] rounded-xl ${expandedClassName}`
                    : isDark
                        ? `border-white/20 bg-white/[0.06] ${collapsedClassName}`
                        : `border-[#DFE1E7] bg-white ${collapsedClassName}`
                }`}
        >
            <div className="flex flex-col items-start gap-3 flex-1">
                <span
                    className={`font-bebas-neue text-2xl font-normal leading-[100%] ${expanded && !isDark ? 'text-[#B23730]' : isDark ? 'text-white' : 'text-[#1D1F2C]'
                        } ${questionClassName}`}
                >
                    {question}
                </span>
                {expanded && (
                    <p
                        className={`font-inter text-base font-normal leading-[160%] ${isDark ? 'text-white/80' : 'text-[#4A4C56]'
                            } ${answerClassName}`}
                    >
                        {answer}
                    </p>
                )}
            </div>
            <ChevronDown
                size={24}
                className={`shrink-0 transition-transform ${expanded ? 'rotate-180' : ''
                    } ${expanded && !isDark ? 'text-[#B23730]' : isDark ? 'text-white' : 'text-[#1D1F2C]'}`}
            />
        </button>
    );
}