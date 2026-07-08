'use client';

import { useState, useRef, useEffect } from 'react';
import { Icon } from '@/components/ui/Icon';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useBooking } from '@/contexts/BookingContext';

const LOCATIONS = [
    { id: 'LRGDT46XWP65E', name: 'Ace Lane' },
    { id: 'LFCP3G26QFGDZ', name: 'East Naperville' },
];

export function LocationFilter() {
    const [open, setOpen] = useState(false);
    const { selectedLocation, setSelectedLocation } = useBooking();
    const [selected, setSelected] = useState(LOCATIONS.find(l => l.id === selectedLocation)?.name || 'Ace Lane');
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

    useEffect(() => {
        if (!selectedLocation) {
            setSelectedLocation('LRGDT46XWP65E');
            setSelected('Ace Lane');
        }
    }, []);

    const handleSelect = (loc: typeof LOCATIONS[0]) => {
        setSelected(loc.name);
        setSelectedLocation(loc.id);
        setOpen(false);
    };

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`flex py-4 px-4 items-center gap-4 rounded-lg border text-sm font-inter ${isDark ? 'border-white/20 bg-white/[0.12] text-white' : 'border-[#DFE1E7] bg-white text-[#1D1F2C]'
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
                            key={loc.id}
                            type="button"
                            onClick={() => handleSelect(loc)}
                            className={`w-full py-3 px-4 text-left text-sm font-inter transition-colors ${selected === loc.name
                                    ? 'text-[#0098E8] bg-[#F0F8FF] dark:bg-[#0098E8]/20'
                                    : isDark
                                        ? 'text-white hover:bg-white/[0.08]'
                                        : 'text-[#1D1F2C] hover:bg-[#F8FAFB]'
                                }`}
                        >
                            {loc.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}