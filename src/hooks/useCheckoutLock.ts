import { useEffect, useRef } from 'react';
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
	const lockTokenRef = useRef(lockToken);
	lockTokenRef.current = lockToken;

	useEffect(() => {
		if (startAt && selectedServices.length > 0 && !lockToken) {
			lock(locationId, startAt, selectedServices.map(s => s.variationId));
		}
	}, []);
	useEffect(() => {
		const handleBeforeUnload = () => {
			if (lockTokenRef.current) {
				fetch(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/appointments/lock/release`,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ locationId, startAt, lockToken: lockTokenRef.current }),
						keepalive: true,
					}
				).catch(() => { });
			}
		};
		window.addEventListener('beforeunload', handleBeforeUnload);
		return () => window.removeEventListener('beforeunload', handleBeforeUnload);
	}, [locationId, startAt]);
}