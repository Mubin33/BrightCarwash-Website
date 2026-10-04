'use client';

import { useEffect, useRef } from 'react';
import { useBooking } from '@/contexts/BookingContext';
import { useBookingLock } from '@/hooks/useBookingLock';
import { hasBookingDetails } from '@/lib/bookingValidation';

// The page owns lifecycle, while the provider owns the single shared lock controller.
export function useCheckoutLock(step: string, enabled: boolean) {
  const { selection, selectedServices, selectedLocation, lockToken } = useBooking();
  const { lock, release, abandon } = useBookingLock();
  const attempted = useRef('');
  const lifecycle = useRef({ active: false });
  const ids = JSON.stringify(selectedServices.map(s => s.variationId));
  useEffect(() => {
    if (!enabled) return;
    if (step !== 'checkout' && step !== 'confirmed') void release();
    if (step !== 'checkout') attempted.current = '';
  }, [enabled, step, release]);
  useEffect(() => {
    if (!enabled) return;
    const serviceVariationIds: string[] = JSON.parse(ids);
    if (step !== 'checkout' || !hasBookingDetails({ ...selection, locationId: selectedLocation, serviceVariationIds })) return;
    const key = JSON.stringify([selectedLocation, selection.startAt, ids]);
    if (lockToken) { attempted.current = key; return; }
    if (attempted.current === key) return;
    attempted.current = key;
    void lock(selectedLocation, selection.startAt, serviceVariationIds);
  }, [enabled, step, lockToken, selection, selectedLocation, ids, lock, release]);
  useEffect(() => {
    window.addEventListener('beforeunload', abandon);
    // Defer unmount cleanup to distinguish Strict Mode effect replay from leaving the page.
    let active = true;
    const mounted = lifecycle.current;
    mounted.active = true;
    return () => {
      active = false;
      mounted.active = false;
      window.removeEventListener('beforeunload', abandon);
      queueMicrotask(() => { if (!active && !mounted.active) abandon(); });
    };
  }, [abandon]);
}
