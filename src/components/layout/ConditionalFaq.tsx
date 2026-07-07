'use client';

import { usePathname } from 'next/navigation';
import { FaqSection } from '@/components/pages/home/all-sections/FaqSection';

export function ConditionalFaq() {
    const pathname = usePathname();

    if (pathname.startsWith('/booking')) return null;

    return <FaqSection />;
}