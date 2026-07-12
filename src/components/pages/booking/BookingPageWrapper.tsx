'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useTheme } from '@/contexts/ThemeContext';
import { BookingSteps } from './BookingSteps';
import { CartStep } from './CartStep';
import { DateTimeStep } from './DateTimeStep';
import { CheckoutStep } from './CheckoutStep';
import { BookingSuccess } from './BookingSuccess';

type Step = 'cart' | 'datetime' | 'checkout' | 'confirmed';

export function BookingPageWrapper() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const stepParam = searchParams.get('step') as Step | null;
    const [step, setStep] = useState<Step>(stepParam || 'cart');
    const { theme } = useTheme();
    const isDark = theme === 'dark';

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

    const visibleStep: 'cart' | 'datetime' | 'checkout' = step === 'confirmed' ? 'checkout' : step;

    return (
        <div>
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Booking', href: '/booking' }]} />
            <section
                className={`flex py-16 sm:py-20 px-4 md:px-6 lg:px-10 flex-col justify-center items-center gap-8 sm:gap-12 self-stretch border rounded-lg ${isDark ? 'border-white/20 bg-[#1A1A1A]' : 'border-[#DFE1E7] bg-white'
                    }`}
            >
                <div className="flex flex-col justify-between items-center w-full max-w-[1280px] xl:max-w-[1320px] 2xl:max-w-[1600px]">
                    <div className="flex flex-col items-center gap-4 sm:gap-6 w-full">
                        {step !== 'confirmed' && <BookingSteps currentStep={visibleStep} onStepChange={updateStep} />}
                        {step === 'cart' && <CartStep onProceed={() => updateStep('datetime')} />}
                        {step === 'datetime' && (
                            <DateTimeStep
                                onProceed={() => updateStep('checkout')}
                                onBack={() => updateStep('cart')}
                            />
                        )}
                        {step === 'checkout' && (
                            <CheckoutStep
                                onBack={() => updateStep('datetime')}
                                onSuccess={() => updateStep('confirmed')}
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