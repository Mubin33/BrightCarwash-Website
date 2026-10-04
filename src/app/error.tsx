'use client';

import Link from 'next/link';
import { ErrorRecovery, type ErrorPageProps } from '@/components/ui/ErrorRecovery';

export default function PageError({ retry }: ErrorPageProps) {
  return (
    <ErrorRecovery
      title="We couldn't display this page"
      retry={retry}
      navigation={<Link href="/" style={{ color: '#071f4d', textDecoration: 'underline' }}>Back to home</Link>}
    >
      <p>Something went wrong. Please try again, or return to the home page.</p>
    </ErrorRecovery>
  );
}
