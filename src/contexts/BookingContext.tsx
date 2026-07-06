'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import type { ServiceData } from '@/data/services';

interface BookingContextType {
    selectedServices: ServiceData[];
    addService: (service: ServiceData) => void;
    removeService: (id: string) => void;
    clearServices: () => void;
}

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
    const [selectedServices, setSelectedServices] = useState<ServiceData[]>([]);

    const addService = useCallback((service: ServiceData) => {
        setSelectedServices((prev) => {
            if (prev.some((s) => s.id === service.id)) return prev;
            return [...prev, service];
        });
    }, []);

    const removeService = useCallback((id: string) => {
        setSelectedServices((prev) => prev.filter((s) => s.id !== id));
    }, []);

    const clearServices = useCallback(() => {
        setSelectedServices([]);
    }, []);

    return (
        <BookingContext.Provider value={{ selectedServices, addService, removeService, clearServices }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
}