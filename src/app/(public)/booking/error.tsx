'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ErrorRecovery, type ErrorPageProps } from '@/components/ui/ErrorRecovery';
import { useBooking } from '@/contexts/BookingContext';

export default function BookingError({ retry }: ErrorPageProps) {
  const { lockActions: { abandon } } = useBooking();

  useEffect(() => {
    // The wizard's unmount cleanup releases its slot. Never reuse that token.
    // The provider stays mounted above this boundary, preserving services/location.
    abandon();
  }, [abandon]);

  return (
    <ErrorRecovery
      title="We couldn't display your booking"
      retry={retry}
      navigation={<Link href="/services" style={{ color: '#071f4d', textDecoration: 'underline' }}>Back to services</Link>}
    >
      <p>Your selected services are still in your cart. Try again to continue; you may need to re-enter your booking details.</p>
      <p>If you already clicked Pay, please contact us to confirm your booking before paying again.</p>
    </ErrorRecovery>
  );
}
