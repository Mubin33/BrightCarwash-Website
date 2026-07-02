'use client';

import { LocationCard } from './LocationCard';
import { LocationsHeader } from './LocationsHeader';
import { LocationHours } from './LocationHours';
import { useTheme } from '@/contexts/ThemeContext';
import { locations, hours } from '@/data/locations';

export function LocationsSectionWrapper() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section
            className={`font-bebas flex py-20 px-[300px] flex-col justify-center items-center gap-12 self-stretch ${isDark ? 'bg-[#1A1A1A]' : 'bg-[#F5F5F5]'}`}
        >
            <LocationsHeader />
            <div className="flex w-full items-center gap-6 max-w-[1320px]">
                {locations.map((loc) => (
                    <LocationCard key={loc.name} location={loc} />
                ))}
            </div>
            <LocationHours hours={hours} />
        </section>
    );
}