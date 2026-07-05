'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ServicesHeader } from './ServicesHeader';
import { ServiceCard } from './ServiceCard';
import { LocationFilter } from './LocationFilter';
import { services } from '@/data/services';
import { useTheme } from '@/contexts/ThemeContext';

export function ServicesSectionWrapper() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section
            className={`flex py-20 px-4 sm:px-8 lg:px-[300px] flex-col justify-center items-center gap-12 self-stretch ${isDark ? 'bg-[#1A1A1A]' : 'bg-white'
                }`}
        >
            <ServicesHeader />

            <div className="font-bebas  flex flex-col sm:flex-row justify-between items-center gap-4 self-stretch">
                <LocationFilter />
                <Link href="/services">
                    <Button
                        variant="secondary"
                        className={`flex py-[14px] px-5 justify-center items-center gap-2 rounded-lg font-inter text-sm ${isDark ? 'bg-white/[0.12] text-white border-white/20 hover:bg-white/20' : ''
                            }`}
                    >
                        View All Available Services
                    </Button>
                </Link>
            </div>

            <div className="font-bebas grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1320px]">
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