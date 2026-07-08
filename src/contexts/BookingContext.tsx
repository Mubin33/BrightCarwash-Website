'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ServiceData } from '@/data/services';

interface BookingContextType {
    selectedServices: ServiceData[];
    selectedLocation: string;
    addService: (service: ServiceData) => void;
    removeService: (id: string) => void;
    clearServices: () => void;
    setSelectedLocation: (locationId: string) => void;
}

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
    const [selectedServices, setSelectedServices] = useState<ServiceData[]>([]);
    const [selectedLocation, setSelectedLocation] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('bookingServices');
        if (stored) {
            try { setSelectedServices(JSON.parse(stored)); } catch { }
        }
        const storedLocation = localStorage.getItem('bookingLocation');
        if (storedLocation) setSelectedLocation(storedLocation);
    }, []);

    useEffect(() => {
        localStorage.setItem('bookingServices', JSON.stringify(selectedServices));
    }, [selectedServices]);

    useEffect(() => {
        if (selectedLocation) localStorage.setItem('bookingLocation', selectedLocation);
    }, [selectedLocation]);

    const addService = useCallback((service: ServiceData) => {
        setSelectedServices((prev) => {
            if (prev.some((s) => s.id === service.id)) return prev;
            const updated = [...prev, service];
            localStorage.setItem('bookingServices', JSON.stringify(updated));
            return updated;
        });
        if (!selectedLocation && service.locationId) {
            setSelectedLocation(service.locationId);
        }
    }, [selectedLocation]);

    const removeService = useCallback((id: string) => {
        setSelectedServices((prev) => {
            const updated = prev.filter((s) => s.id !== id);
            localStorage.setItem('bookingServices', JSON.stringify(updated));
            return updated;
        });
    }, []);

    const clearServices = useCallback(() => {
        setSelectedServices([]);
        setSelectedLocation('');
        localStorage.removeItem('bookingServices');
        localStorage.removeItem('bookingLocation');
    }, []);

    return (
        <BookingContext.Provider value={{ selectedServices, selectedLocation, addService, removeService, clearServices, setSelectedLocation }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (!context) throw new Error('useBooking must be used within a BookingProvider');
    return context;
}