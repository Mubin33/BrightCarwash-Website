'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ServiceData } from '@/data/services';

interface BookingContextType {
    selectedServices: ServiceData[];
    selectedLocation: string;
    lockToken: string | null;
    setLockToken: (token: string | null) => void;
    addService: (service: ServiceData) => void;
    removeService: (id: string) => void;
    clearServices: () => void;
    setSelectedLocation: (locationId: string) => void;
}

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
    const [selectedServices, setSelectedServices] = useState<ServiceData[]>([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [lockToken, setLockToken] = useState<string | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('bookingServices');
        if (stored) {
            try { setSelectedServices(JSON.parse(stored)); } catch { }
        }
        const storedLocation = localStorage.getItem('bookingLocation');
        if (storedLocation) setSelectedLocation(storedLocation);
        const storedLockToken = localStorage.getItem('bookingLockToken');
        if (storedLockToken) setLockToken(storedLockToken);
    }, []);

    useEffect(() => {
        localStorage.setItem('bookingServices', JSON.stringify(selectedServices));
    }, [selectedServices]);

    useEffect(() => {
        if (selectedLocation) localStorage.setItem('bookingLocation', selectedLocation);
    }, [selectedLocation]);

    useEffect(() => {
        if (lockToken) {
            localStorage.setItem('bookingLockToken', lockToken);
        } else {
            localStorage.removeItem('bookingLockToken');
        }
    }, [lockToken]);

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
        setLockToken(null);
        localStorage.removeItem('bookingServices');
        localStorage.removeItem('bookingLocation');
        localStorage.removeItem('bookingLockToken');
    }, []);

    return (
        <BookingContext.Provider value={{
            selectedServices, selectedLocation,
            lockToken, setLockToken,
            addService, removeService, clearServices,
            setSelectedLocation,
        }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (!context) throw new Error('useBooking must be used within a BookingProvider');
    return context;
}