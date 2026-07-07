'use client';

import { useState, useRef, useEffect } from 'react';
import { Icon } from '@/components/ui/Icon';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const LOCATIONS = ['East Naperville', 'Ace Lane'];

export function LocationFilter() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(LOCATIONS[0]);
    const ref = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`flex py-3 sm:py-4 px-3 sm:px-4 items-center gap-3 sm:gap-4 rounded-lg border text-sm font-inter ${isDark
                    ? 'border-white/20 bg-white/[0.12] text-white'
                    : 'border-[#DFE1E7] bg-white text-[#1D1F2C]'
                    }`}
            >
                <Icon name="location" width={16} height={16} color="#0098E8" />
                <span>{selected}</span>
                <ChevronDown size={16} className="text-[#777980]" />
            </button>
            {open && (
                <div className={`absolute top-full left-0 mt-1 w-full rounded-lg border shadow-lg z-50 ${isDark ? 'border-white/20 bg-[#1A1A1A]' : 'border-[#E8E8E9] bg-white'
                    }`}>
                    {LOCATIONS.map((loc) => (
                        <button
                            key={loc}
                            type="button"
                            onClick={() => { setSelected(loc); setOpen(false); }}
                            className={`w-full py-2.5 sm:py-3 px-3 sm:px-4 text-left text-sm font-inter transition-colors ${selected === loc
                                    ? 'text-[#0098E8] bg-[#F0F8FF]'
                                    : isDark
                                        ? 'text-white hover:bg-white/[0.08]'
                                        : 'text-[#1D1F2C] hover:bg-[#F8FAFB]'
                                }`}
                        >
                            {loc}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}