'use client';

import { useState } from 'react';

import { services } from '@/data/services';
import { useTheme } from '@/contexts/ThemeContext';
import { LocationFilter } from '../home/services/LocationFilter';
import { ServiceCard } from '../home/services/ServiceCard';

export function ServicesList() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section
            className={`flex py-20 px-4 sm:px-8 lg:px-[300px] flex-col justify-center items-center gap-12 self-stretch ${isDark ? 'bg-[#1A1A1A]' : 'bg-[#F5F5F5]'
                }`}
        >
            <div className="flex justify-center self-stretch max-w-[1320px] w-full">
                <LocationFilter />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1320px]">
                {services.map((service) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        selected={selectedId === service.id}
                        onSelect={setSelectedId}
                    />
                ))}
            </div>
        </section>
    );
}