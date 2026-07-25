'use client';

import { usePathname } from 'next/navigation';
import { TrustedBy } from '@/components/pages/home/TrustedBy/TrustedBy';

export function ConditionalTrustedBy() {
    const pathname = usePathname();

    // Only show on home page
    if (pathname !== '/') return null;

    return <TrustedBy />;
}