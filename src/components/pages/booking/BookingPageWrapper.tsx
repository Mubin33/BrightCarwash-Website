'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useTheme } from '@/contexts/ThemeContext';
import { BookingSteps } from './BookingSteps';
import { CartStep } from './CartStep';
import { DateTimeStep } from './DateTimeStep';
import { CheckoutStep } from './CheckoutStep';
import { BookingSuccess } from './BookingSuccess';
import { useBooking } from '@/contexts/BookingContext';
import { useCheckoutLock } from '@/hooks/useCheckoutLock';
import { useBookingLock } from '@/hooks/useBookingLock';

type Step = 'cart' | 'datetime' | 'checkout' | 'confirmed';

export function BookingPageWrapper() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const stepParam = searchParams.get('step') as Step | null;
    const [step, setStep] = useState<Step>(stepParam || 'cart');
    const [bookingStartAt, setBookingStartAt] = useState(searchParams.get('startAt') || '');
    const [bookingTime, setBookingTime] = useState(searchParams.get('time') || '');
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    // Inside BookingPageWrapper, add:
    const { lockToken, selectedLocation } = useBooking();
    const { release } = useBookingLock();
    const startAt = searchParams.get('startAt') || bookingStartAt;

    // Refs mirror latest values so unmount-time cleanup (e.g. Navbar link navigation)
    // never reads a stale/blank startAt caused by the URL already having changed.
    const stepRef = useRef(step);
    const lockTokenRef = useRef(lockToken);
    const selectedLocationRef = useRef(selectedLocation);
    const startAtRef = useRef(startAt);

    useEffect(() => { stepRef.current = step; }, [step]);
    useEffect(() => { lockTokenRef.current = lockToken; }, [lockToken]);
    useEffect(() => { selectedLocationRef.current = selectedLocation; }, [selectedLocation]);
    useEffect(() => { startAtRef.current = startAt; }, [startAt]);

    useEffect(() => {
        if (step !== 'checkout' && step !== 'confirmed' && lockToken) {
            release(selectedLocation, startAt);
        }
    }, [step]);

    // Fires only when BookingPageWrapper truly unmounts — i.e. the user navigates
    // away from /booking entirely (Navbar: Home, About Us, Services, Gallery, News, Store).
    // Uses refs (not searchParams) so startAt is still valid at cleanup time.
    // Uses fetch with keepalive (not sendBeacon) because this is a cross-origin
    // call with a JSON body — sendBeacon cannot perform the CORS preflight that
    // application/json requires cross-origin, while keepalive fetch can, and still
    // survives the navigation/unmount the same way sendBeacon would.
    useEffect(() => {
        return () => {
            if (
                (stepRef.current === 'checkout') &&
                lockTokenRef.current &&
                selectedLocationRef.current &&
                startAtRef.current
            ) {
                fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/appointments/lock/release`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            locationId: selectedLocationRef.current,
                            startAt: startAtRef.current,
                            lockToken: lockTokenRef.current,
                        }),
                        keepalive: true,
                    }
                ).catch(() => { });
            }
        };
    }, []);

    const updateStep = (newStep: Step) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('step', newStep);
        router.push(`/booking?${params.toString()}`, { scroll: false });
        setStep(newStep);
    };

    useEffect(() => {
        if (stepParam && stepParam !== step) {
            setStep(stepParam);
        }
    }, [stepParam]);

    const handleDateTimeProceed = (startAt: string, time: string) => {
        setBookingStartAt(startAt);
        setBookingTime(time);
        updateStep('checkout');
    };

    const visibleStep: 'cart' | 'datetime' | 'checkout' = step === 'confirmed' ? 'checkout' : step;

    return (
        <div>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Booking', href: '/booking' }]} />
            <section
                className={`flex py-16 sm:py-20 px-4 md:px-6 lg:px-10 flex-col justify-center items-center gap-8 sm:gap-12 self-stretch border rounded-lg ${isDark ? 'border-white/20 bg-[#1A1A1A]' : 'border-[#DFE1E7] bg-white'
                    }`}
            >
                <div className="flex flex-col justify-between items-center w-full max-w-[1280px] xl:max-w-[1320px]">
                    <div className="flex flex-col items-center gap-4 sm:gap-6 w-full">
                        {step !== 'confirmed' && <BookingSteps currentStep={visibleStep} onStepChange={updateStep} />}
                        {step === 'cart' && <CartStep onProceed={() => updateStep('datetime')} />}
                        {step === 'datetime' && (
                            <DateTimeStep
                                onProceed={handleDateTimeProceed}
                                onBack={() => updateStep('cart')}
                            />
                        )}
                        {step === 'checkout' && (
                            <CheckoutStep
                                onBack={() => updateStep('datetime')}
                                onSuccess={() => updateStep('confirmed')}
                                bookingStartAt={bookingStartAt}
                                bookingTime={bookingTime}
                            />
                        )}
                        {step === 'confirmed' && (
                            <div className="flex justify-center w-full">
                                <BookingSuccess />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}