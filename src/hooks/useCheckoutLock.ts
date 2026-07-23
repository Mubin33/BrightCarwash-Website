import { useEffect } from 'react';
import type { ServiceData } from '@/data/services';

interface Params {
    startAt: string;
    selectedServices: ServiceData[];
    lockToken: string | null;
    locationId: string;
    lock: (locationId: string, startAt: string, ids: string[]) => Promise<any>;
    release: (locationId: string, startAt: string) => Promise<void>;
}

export function useCheckoutLock({ startAt, selectedServices, lockToken, locationId, lock, release }: Params) {
    useEffect(() => {
        if (startAt && selectedServices.length > 0 && !lockToken) {
            lock(locationId, startAt, selectedServices.map(s => s.variationId));
        }
    }, []);

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (lockToken) {
                navigator.sendBeacon(`${process.env.NEXT_PUBLIC_API_BASE_URL}/appointments/lock/release`, JSON.stringify({ locationId, startAt, lockToken }));
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [lockToken, startAt, locationId]);
}