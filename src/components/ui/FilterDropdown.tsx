'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Props {
    label: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export function FilterDropdown({ label, options, value, onChange, className = '' }: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedLabel = value ? options.find((o) => o.value === value)?.label || label : label;

    return (
        <div ref={ref} className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex py-3 px-4 items-center gap-2 rounded-lg border border-[#DFE1E7] bg-white text-sm font-inter whitespace-nowrap"
            >
                <span className={value ? 'text-[#1B1B1B]' : 'text-[#777980]'}>{selectedLabel}</span>
                <ChevronDown size={16} className={`text-[#777980] transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-lg border border-[#E8E8E9] shadow-lg z-50">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => { onChange(opt.value); setOpen(false); }}
                            className={`w-full py-2.5 px-4 text-left text-sm font-inter hover:bg-[#F8FAFB] ${value === opt.value ? 'text-[#0098E8] bg-[#F0F8FF]' : 'text-[#1B1B1B]'
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}