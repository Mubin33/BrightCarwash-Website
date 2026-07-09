'use client';

import { useState, useRef, useEffect } from 'react';
import { Icon } from '@/components/ui/Icon';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useBooking } from '@/contexts/BookingContext';
import { useLocations } from '@/hooks/useLocations';
import type { ApiLocation } from '@/types/locations';

function formatAddress(loc: ApiLocation): string {
    const a = loc.address;
    if (!a) return '';
    return `${a.addressLine1}, ${a.locality}, ${a.administrativeDistrictLevel1} ${a.postalCode}`;
}

export function LocationFilter() {
    const [open, setOpen] = useState(false);
    const { selectedLocation, setSelectedLocation } = useBooking();
    const { locations, loading } = useLocations();
    const ref = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const selectedLoc = locations.find(l => l.id === selectedLocation);
    const selectedName = selectedLoc?.name || locations[0]?.name || '';

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (!selectedLocation && locations.length > 0) {
            setSelectedLocation(locations[0].id);
        }
    }, [locations, selectedLocation, setSelectedLocation]);

    const handleSelect = (loc: ApiLocation) => {
        setSelectedLocation(loc.id);
        setOpen(false);
    };

    if (loading || locations.length === 0) return null;

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`flex py-4 px-4 items-center gap-4 rounded-lg border text-sm font-inter ${isDark ? 'border-white/20 bg-white/[0.12] text-white' : 'border-[#DFE1E7] bg-white text-[#1D1F2C]'
                    }`}
            >
                <Icon name="location" width={16} height={16} color="#0098E8" />
                <span>{selectedName}</span>
                <ChevronDown size={16} className="text-[#777980]" />
            </button>
            {open && (
                <div className={`absolute top-full left-0 mt-1 w-full rounded-lg border shadow-lg z-50 ${isDark ? 'border-white/20 bg-[#1A1A1A]' : 'border-[#E8E8E9] bg-white'
                    }`}>
                    {locations.map((loc) => (
                        <button
                            key={loc.id}
                            type="button"
                            onClick={() => handleSelect(loc)}
                            className={`w-full py-3 px-4 text-left text-sm font-inter transition-colors ${selectedLocation === loc.id
                                    ? 'text-[#0098E8] bg-[#F0F8FF] dark:bg-[#0098E8]/20'
                                    : isDark
                                        ? 'text-white hover:bg-white/[0.08]'
                                        : 'text-[#1D1F2C] hover:bg-[#F8FAFB]'
                                }`}
                        >
                            <div className="font-medium">{loc.name}</div>
                            <div className={`text-xs mt-0.5 ${isDark ? 'text-white/50' : 'text-[#777980]'}`}>
                                {formatAddress(loc)}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}