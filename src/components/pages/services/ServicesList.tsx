'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useServices } from '@/hooks/useServices';
import { useTheme } from '@/contexts/ThemeContext';
import { useBooking } from '@/contexts/BookingContext';
import { LocationFilter } from '../home/services/LocationFilter';
import { ServiceCard } from '../home/services/ServiceCard';
import type { ServiceData } from '@/data/services';

export function ServicesList() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const router = useRouter();
    const { addService, removeService, selectedServices } = useBooking();
    const { selectedLocation } = useBooking();
    const { services, loading } = useServices(selectedLocation || undefined);

    const isInCart = useCallback((id: string) => selectedServices.some((s) => s.id === id), [selectedServices]);

    const handleAddToCart = (service: ServiceData) => {
        addService(service);
    };

    const handleRemoveFromCart = (service: ServiceData) => {
        removeService(service.id);
    };

    const handleConfirmBooking = (service: ServiceData) => {
        if (!isInCart(service.id)) {
            addService(service);
        }
        router.push('/booking');
    };

    if (loading) {
        return (
            <section className={`flex py-20 px-4 md:px-6 lg:px-10 flex-col justify-center items-center gap-12 self-stretch ${isDark ? 'bg-[#1A1A1A]' : 'bg-[#F5F5F5]'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[1280px] xl:max-w-[1320px] 2xl:max-w-[1600px]">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-[400px] sm:h-[500px] bg-gray-100 animate-pulse rounded-lg" />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section
            className={`flex py-20 px-4 md:px-6 lg:px-10 flex-col justify-center items-center gap-12 self-stretch ${isDark ? 'bg-[#1A1A1A]' : 'bg-[#F5F5F5]'}`}
        >
            <div className="flex justify-center w-full">
                <LocationFilter />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1280px] xl:max-w-[1320px] 2xl:max-w-[1600px]">
                {services.map((service) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        selected={isInCart(service.id)}
                        onAddToCart={handleAddToCart}
                        onRemoveFromCart={handleRemoveFromCart}
                        onConfirmBooking={handleConfirmBooking}
                    />
                ))}
            </div>
        </section>
    );
}