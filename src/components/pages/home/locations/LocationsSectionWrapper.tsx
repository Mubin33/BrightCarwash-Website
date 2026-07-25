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
            className={`flex py-10 px-4 md:px-6 lg:px-10 flex-col justify-center items-center gap-12 self-stretch ${isDark ? 'bg-[#1a1712]' : 'bg-[#fff8ee]'}`}
        >
            <LocationsHeader />
            <div className="flex flex-col gap-6 w-full max-w-7xl xl:max-w-330 ">
                <div className="flex flex-col lg:flex-row w-full items-stretch gap-6">
                    {locations.map((loc) => (
                        <LocationCard key={loc.name} location={loc} />
                    ))}
                </div>
                <div className="w-full">
                    <LocationHours hours={hours} />
                </div>
            </div>
        </section>
    );
}