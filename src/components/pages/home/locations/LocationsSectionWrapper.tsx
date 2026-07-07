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
            className={`flex py-10 sm:py-14 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-6 xl:px-40 2xl:px-[300px] flex-col justify-center items-center gap-8 sm:gap-10 lg:gap-12 self-stretch ${isDark ? 'bg-[#1A1A1A]' : 'bg-[#F5F5F5]'}`}
        >
            <LocationsHeader />
            <div className="flex flex-col lg:flex-row w-full items-stretch gap-4 sm:gap-6 max-w-[1320px]">
                {locations.map((loc) => (
                    <LocationCard key={loc.name} location={loc} />
                ))}
            </div>
            <div className="w-full max-w-[1320px]">
                <LocationHours hours={hours} />
            </div>
        </section>
    );
}