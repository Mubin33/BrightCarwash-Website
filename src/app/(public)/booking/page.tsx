import { createPageMetadata } from '@/lib/site';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { BookingPageWrapper } from '@/components/pages/booking/BookingPageWrapper';

export const metadata: Metadata = createPageMetadata(
    '/booking',
    'Book Your Wash',
    'Book your next car wash, detail, or membership at Brightside Car Wash in Naperville in under a minute.',
);

export default function BookingPage() {
    return (
        <Suspense fallback={<div className="pt-28"><div className="h-64 bg-gray-100 animate-pulse" /></div>}>
            <BookingPageWrapper />
        </Suspense>
    );
}