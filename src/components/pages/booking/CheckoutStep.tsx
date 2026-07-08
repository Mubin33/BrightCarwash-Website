'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ContactInfoForm } from './ContactInfoForm';
import { PaymentDetailsForm } from './PaymentDetailsForm';
import { CountdownTimer } from './CountdownTimer';
import { AppointmentSummary } from './AppointmentSummary';
import { useBooking } from '@/contexts/BookingContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useCheckout } from '@/hooks/useCheckout';
import { useBookingLock } from '@/hooks/useBookingLock';
import { toast } from 'react-toastify';

interface Props {
    onBack: () => void;
}

const LOCATION_ID = 'LRGDT46XWP65E';

export function CheckoutStep({ onBack }: Props) {
    const [agreed, setAgreed] = useState(false);
    const [contactInfo, setContactInfo] = useState({ firstName: '', lastName: '', phone: '', email: '', note: '' });
    const [paymentInfo, setPaymentInfo] = useState({ cardNumber: '', expiry: '', cvv: '' });
    const searchParams = useSearchParams();
    const router = useRouter();
    const { selectedServices } = useBooking();
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const { checkout, loading: checkoutLoading } = useCheckout();
    const { lockToken, lock, release } = useBookingLock();

    const dateParam = searchParams.get('date');
    const teamMemberId = searchParams.get('teamMemberId') || 'TMJ05qjLA76pqIAf';
    const startAt = searchParams.get('startAt') || '';

    useEffect(() => {
        if (startAt && selectedServices.length > 0) {
            lock(LOCATION_ID, startAt, selectedServices.map((s) => s.variationId));
        }
        return () => {
            if (lockToken) release(LOCATION_ID, startAt);
        };
    }, []);

    const handleBack = () => {
        if (lockToken) release(LOCATION_ID, startAt);
        onBack();
    };

    const isFormValid =
        contactInfo.firstName.trim() && contactInfo.lastName.trim() &&
        contactInfo.phone.trim() && contactInfo.email.trim() &&
        paymentInfo.cardNumber.replace(/\s/g, '').length === 16 &&
        paymentInfo.expiry.length === 5 && paymentInfo.cvv.length === 3 && agreed;

    const handleCheckout = async () => {
        if (!isFormValid) { toast.warning('Please fill all required fields'); return; }
        const success = await checkout({
            locationId: LOCATION_ID, startAt, lockToken: lockToken || '',
            cartItems: selectedServices.map((s) => ({ serviceVariationId: s.variationId, teamMemberId })),
            customerName: `${contactInfo.firstName} ${contactInfo.lastName}`,
            customerEmail: contactInfo.email, customerPhone: contactInfo.phone,
            customerNote: contactInfo.note, vehicle: 'Not specified',
        });
        if (success) router.push('/booking?step=confirmed');
    };

    return (
        <div className={`flex flex-col w-full p-4 sm:p-6 items-start gap-6 rounded-lg border ${isDark ? 'border-white/20 bg-white/[0.06]' : 'border-[#DFE1E7] bg-[#F8FAFB]'}`}>
            <div className="flex flex-col lg:flex-row items-start gap-4 self-stretch">
                <div className="flex flex-col justify-center items-start gap-4 flex-1">
                    <ContactInfoForm values={contactInfo} onChange={setContactInfo} />
                    <PaymentDetailsForm values={paymentInfo} onChange={setPaymentInfo} agreed={agreed} onAgreeChange={setAgreed} />
                </div>
                <div className="flex flex-col items-start gap-4 flex-1 lg:max-w-[400px] self-stretch">
                    <CountdownTimer onExpire={() => lockToken && release(LOCATION_ID, startAt)} />
                    <AppointmentSummary />
                    <div className="flex gap-2 self-stretch">
                        <Button variant="outline" onClick={handleBack} className={`flex-1 py-[14px] px-5 justify-center rounded-xl border font-inter text-sm ${isDark ? 'border-white/20 bg-white/[0.08] text-white' : 'border-[#DFE1E7] bg-[#F8FAFB] text-[#1B1B1B]'}`}>Back</Button>
                        <Button onClick={handleCheckout} disabled={!isFormValid || !lockToken} isLoading={checkoutLoading} loadingText="Processing..." className="flex-1 py-[14px] px-5 justify-center items-center gap-2 rounded-xl bg-[#0098E8] text-white font-inter text-sm disabled:opacity-50">Confirm & Pay</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}