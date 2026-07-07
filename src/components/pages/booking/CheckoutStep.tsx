'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ContactInfoForm } from './ContactInfoForm';
import { PaymentDetailsForm } from './PaymentDetailsForm';
import { BookingSummary } from './BookingSummary';
import { useTheme } from '@/contexts/ThemeContext';

interface Props {
    onBack: () => void;
}

export function CheckoutStep({ onBack }: Props) {
    const [agreed, setAgreed] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className={`flex flex-col w-full p-4 sm:p-6 items-start gap-6 rounded-lg border ${isDark ? 'border-white/20 bg-white/[0.06]' : 'border-[#DFE1E7] bg-[#F8FAFB]'}`}>
            <div className="flex flex-col lg:flex-row items-start gap-4 self-stretch">
                <div className="flex flex-col justify-center items-start gap-4 flex-1">
                    <ContactInfoForm />
                    <PaymentDetailsForm agreed={agreed} onAgreeChange={setAgreed} />
                </div>

                <div className="flex flex-col items-start gap-4 flex-1 lg:max-w-[400px] self-stretch">
                    <BookingSummary />
                    <Button disabled={!agreed} className="w-full py-[14px] px-5 justify-center items-center gap-2 rounded-xl bg-[#0098E8] text-white font-inter text-sm disabled:opacity-50">
                        Confirm & Pay
                    </Button>
                    <Button variant="outline" onClick={onBack} className={`w-full py-[14px] px-5 justify-center rounded-xl border font-inter text-sm ${isDark ? 'border-white/20 bg-white/[0.08] text-white' : 'border-[#DFE1E7] bg-[#F8FAFB] text-[#1B1B1B]'}`}>
                        Back to Date & Time
                    </Button>
                </div>
            </div>
        </div>
    );
}