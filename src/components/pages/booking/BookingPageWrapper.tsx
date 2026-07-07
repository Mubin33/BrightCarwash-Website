'use client';

import { useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useTheme } from '@/contexts/ThemeContext';
import { BookingSteps } from './BookingSteps';
import { CartStep } from './CartStep';
import { DateTimeStep } from './DateTimeStep';
import { CheckoutStep } from './CheckoutStep';

export function BookingPageWrapper() {
    const [step, setStep] = useState<'cart' | 'datetime' | 'checkout'>('cart');
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div >
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Booking', href: '/booking' }]} />
            <section
                className={`flex py-20 px-4 sm:px-8 lg:px-[300px] flex-col justify-center items-center gap-12 self-stretch border rounded-lg ${isDark ? 'border-white/20 bg-[#1A1A1A]' : 'border-[#DFE1E7] bg-white'
                    }`}
            >
                <div className="flex flex-col justify-between items-center self-stretch w-full max-w-[1320px]">
                    <div className="flex flex-col items-start gap-6 self-stretch">
                        <BookingSteps currentStep={step} onStepChange={setStep} />
                        {step === 'cart' && <CartStep onProceed={() => setStep('datetime')} />}
                        {step === 'datetime' && <DateTimeStep />}
                        {step === 'checkout' && <CheckoutStep />}
                    </div>
                </div>
            </section>
        </div>
    );
}