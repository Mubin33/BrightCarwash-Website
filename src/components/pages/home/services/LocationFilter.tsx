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
                className={`flex py-4 px-4 items-center gap-4 rounded-lg border border-[#DFE1E7] bg-white text-[#1D1F2C] font-inter text-sm ${isDark ? 'bg-white/[0.12] text-white border-white/20 hover:bg-white/20' : ''
                    }`}
            >
                <Icon name="location" width={16} height={16} color="#0098E8" />
                <span>{selected}</span>
                <ChevronDown size={16} className="text-[#777980]" />
            </button>
            {open && (
                <div className={`absolute top-full left-0 mt-1 w-full bg-white rounded-lg border border-[#E8E8E9] shadow-lg z-50 ${isDark ? 'bg-white/[0.12] text-white border-white/20 hover:bg-white/20' : ''}`}>
                    {LOCATIONS.map((loc) => (
                        <button
                            key={loc}
                            type="button"
                            onClick={() => { setSelected(loc); setOpen(false); }}
                            className={`w-full py-3 px-4 text-left text-sm font-inter hover:bg-[#F8FAFB] ${selected === loc ? 'text-[#0098E8] bg-[#F0F8FF]' : 'text-[#1D1F2C]'
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