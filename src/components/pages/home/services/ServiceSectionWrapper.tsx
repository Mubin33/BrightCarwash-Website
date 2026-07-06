'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ServicesHeader } from './ServicesHeader';
import { ServiceCard } from './ServiceCard';
import { LocationFilter } from './LocationFilter';
import { useServices } from '@/hooks/useServices';
import { useTheme } from '@/contexts/ThemeContext';

export function ServicesSectionWrapper() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const { services, loading } = useServices();

    if (loading) {
        return (
            <section className={`flex py-20 px-4 sm:px-8 lg:px-[300px] flex-col justify-center items-center gap-12 self-stretch ${isDark ? 'bg-[#1A1A1A]' : 'bg-white'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1320px]">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-[500px] bg-gray-100 animate-pulse rounded-lg" />
                    ))}
                </div>
            </section>
        );
    }
    if (loading || services.length === 0) return null;

    return (
        <section
            id='services'
            className={`flex py-20 px-4 sm:px-8 lg:px-[300px] flex-col justify-center items-center gap-12 self-stretch ${isDark ? 'bg-[#1A1A1A]' : 'bg-[#ECEFF3]'
                }`}
        >
            <ServicesHeader />

            <div className="font-inter flex flex-col sm:flex-row justify-between items-center gap-4 w-full max-w-[1320px]">
                <LocationFilter />
                <Link href="/services">
                    <Button
                        variant="secondary"
                        className={`flex py-[14px] px-5 justify-center items-center gap-2 rounded-lg font-inter border border-[#DFE1E7] text-sm ${isDark ? 'bg-white/[0.12] text-white border-white/20 hover:bg-white/20' : ''
                            }`}
                    >
                        View All Available Services
                    </Button>
                </Link>
            </div>

            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1320px]">
                {services.slice(0, 3).map((service) => (
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