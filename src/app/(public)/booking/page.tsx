import { Suspense } from 'react';
import { BookingPageWrapper } from '@/components/pages/booking/BookingPageWrapper';

export default function BookingPage() {
    return (
        <Suspense fallback={<div className="pt-28"><div className="h-64 bg-gray-100 animate-pulse" /></div>}>
            <BookingPageWrapper />
        </Suspense>
    );
}