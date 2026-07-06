'use client';

import { useState } from 'react';

import { useServices } from '@/hooks/useServices';
import { useTheme } from '@/contexts/ThemeContext';
import { LocationFilter } from '../home/services/LocationFilter';
import { ServiceCard } from '../home/services/ServiceCard';

export function ServicesList() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const { services, loading } = useServices();
    const { theme } = useTheme();
    const isDark = theme === 'dark';


    if (loading) {
        return (
            <section className={`flex py-20 px-4 sm:px-8 lg:px-[300px] flex-col justify-center items-center gap-12 self-stretch border ${isDark ? 'border-white/20 bg-[#1A1A1A]' : 'border-[#DFE1E7] bg-white'
                }`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[1320px]">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-[500px] bg-gray-100 animate-pulse rounded-lg" />
                    ))}
                </div>
            </section>
        );
    }


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