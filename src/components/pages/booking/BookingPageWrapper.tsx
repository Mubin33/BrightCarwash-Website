'use client';

import { useEffect } from 'react';
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
import { selectionFromSearch } from '@/lib/booking-storage';
import { hasBookingDetails } from '@/lib/bookingValidation';

type Step = 'cart' | 'datetime' | 'checkout' | 'confirmed';

export function BookingPageWrapper() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const requestedStep = searchParams.get('step');
    const parsedStep: Step = requestedStep === 'datetime' || requestedStep === 'checkout' || requestedStep === 'confirmed'
        ? requestedStep : 'cart';
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const { hydrated, selectedServices, selectedLocation, selection, lastBookingDetails, setSelection } = useBooking();
    // Accept old bookmarked URLs once, then use the same state as the rest of the wizard.
    const query = searchParams.toString();
    const hasLegacySelection = ['date', 'time', 'startAt', 'teamMemberId'].some(key => searchParams.has(key));
    const hasServicesAndLocation = selectedServices.length > 0 && !!selectedLocation;
    const hasValidSelection = hasBookingDetails({
        ...selection,
        locationId: selectedLocation,
        serviceVariationIds: selectedServices.map(service => service.variationId),
    });
    const hasConfirmation = (lastBookingDetails?.services.length ?? 0) > 0;
    const step: Step = !hydrated || hasLegacySelection
        ? parsedStep
        : parsedStep === 'confirmed'
            ? hasConfirmation ? 'confirmed' : 'cart'
            : parsedStep === 'checkout'
                ? hasValidSelection ? 'checkout' : hasServicesAndLocation ? 'datetime' : 'cart'
                : parsedStep === 'datetime'
                    ? hasServicesAndLocation ? 'datetime' : 'cart'
                    : 'cart';
    useEffect(() => {
        if (!hydrated || !hasLegacySelection) return;
        setSelection(selectionFromSearch(query));
        router.replace(`/booking?step=${step}`, { scroll: false });
    }, [hydrated, hasLegacySelection, query, setSelection, router, step]);
    useEffect(() => {
        if (!hydrated || hasLegacySelection) return;
        if (requestedStep !== step) {
            router.replace(`/booking?step=${step}`, { scroll: false });
        }
    }, [hydrated, hasLegacySelection, requestedStep, router, step]);
    useCheckoutLock(step, hydrated && !hasLegacySelection);
    const updateStep = (newStep: Step) => {
        router.push(`/booking?step=${newStep}`, { scroll: false });
    };
    const handleDateTimeProceed = () => updateStep('checkout');

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
                        {hydrated && !hasLegacySelection && step === 'cart' && <CartStep onProceed={() => updateStep('datetime')} />}
                        {hydrated && !hasLegacySelection && step === 'datetime' && (
                            <DateTimeStep
                                onProceed={handleDateTimeProceed}
                                onBack={() => updateStep('cart')}
                            />
                        )}
                        {hydrated && !hasLegacySelection && step === 'checkout' && (
                            <CheckoutStep
                                onBack={() => updateStep('datetime')}
                                onSuccess={() => updateStep('confirmed')}
                            />
                        )}
                        {hydrated && !hasLegacySelection && step === 'confirmed' && (
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