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

	// No unmount-cleanup release here on purpose — React Strict Mode's
	// synthetic mount -> cleanup -> remount was firing this immediately
	// in dev, releasing the lock right after DateTimeStep set it, which
	// left Confirm & Pay permanently disabled. Release is already handled by:
	// - CheckoutButtons.handleBack (explicit back navigation)
	// - beforeunload below (tab close / hard navigation)
	// - BookingPageWrapper's step-change effect (leaving checkout step)

	useEffect(() => {
		const handleBeforeUnload = () => {
			if (lockTokenRef.current) {
				navigator.sendBeacon(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/appointments/lock/release`,
					JSON.stringify({ locationId, startAt, lockToken: lockTokenRef.current })
				);
			}
		};
		window.addEventListener('beforeunload', handleBeforeUnload);
		return () => window.removeEventListener('beforeunload', handleBeforeUnload);
	}, [locationId, startAt]);
}