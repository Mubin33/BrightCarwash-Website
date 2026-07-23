'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ContactInfoForm } from './ContactInfoForm';
import { SquarePaymentForm } from './SquarePaymentForm';
import { CountdownTimer } from './CountdownTimer';
import { AppointmentSummary } from './AppointmentSummary';
import { useBooking } from '@/contexts/BookingContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useCheckout } from '@/hooks/useCheckout';
import { useBookingLock } from '@/hooks/useBookingLock';
import { CheckoutProcessingOverlay } from './CheckoutProcessingOverlay';
import { CheckoutButtons } from './CheckoutButtons';
import { useCheckoutLock } from '@/hooks/useCheckoutLock';
import { useCheckoutValidation } from '@/hooks/useCheckoutValidation';
import { toast } from 'react-toastify';

interface Props { onBack: () => void; onSuccess: () => void; }

export function CheckoutStep({ onBack, onSuccess }: Props) {
    const [agreed, setAgreed] = useState(false);
    const [contactInfo, setContactInfo] = useState({ firstName: '', lastName: '', phone: '', email: '', note: '' });
    const searchParams = useSearchParams();
    const { selectedServices, selectedLocation, lockToken, clearServices, setLockToken } = useBooking();
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const { checkout, loading: checkoutLoading } = useCheckout();
    const { lock, release } = useBookingLock();
    const { isFormValid, errors } = useCheckoutValidation(contactInfo, agreed);
    const teamMemberId = searchParams.get('teamMemberId') || '';
    const startAt = searchParams.get('startAt') || '';
    useCheckoutLock({ startAt, selectedServices, lockToken, locationId: selectedLocation, lock, release });

    const handleCheckout = async () => {
        if (!isFormValid) {
            toast.warning('Please fill all required fields');
            return;
        }
        const tokenize = (window as any).__tokenizeCard;
        if (!tokenize) {
            toast.warning('Payment system not ready. Please try again.');
            return;
        }
        const nonce = await tokenize();
        if (!nonce) return;
        const success = await checkout({ locationId: selectedLocation, startAt, lockToken: lockToken || '', cartItems: selectedServices.map(s => ({ serviceVariationId: s.variationId, teamMemberId })), customerName: `${contactInfo.firstName} ${contactInfo.lastName}`, customerEmail: contactInfo.email, customerPhone: `+1${contactInfo.phone.replace(/\D/g, '')}`, customerNote: contactInfo.note, vehicle: 'Not specified', nonce });
        if (success) { clearServices(); onSuccess(); } else { if (lockToken) await release(selectedLocation, startAt); await lock(selectedLocation, startAt, selectedServices.map(s => s.variationId)); }
    };

    return (
        <div className={`relative overflow-hidden flex flex-col w-full p-4 sm:p-6 items-start gap-6 rounded-lg border ${isDark ? 'border-white/20 bg-white/[0.06]' : 'border-[#DFE1E7] bg-[#F8FAFB]'}`}>
            <CheckoutProcessingOverlay isLoading={checkoutLoading} isDark={isDark} />
            <div className="flex flex-col lg:flex-row items-start gap-4 self-stretch">
                <div className="flex flex-col justify-center items-start gap-4 flex-1">
                    <ContactInfoForm values={contactInfo} onChange={setContactInfo} disabled={checkoutLoading} errors={errors} />
                    <SquarePaymentForm locationId={selectedLocation} onNonceReady={() => { }} disabled={checkoutLoading} agreed={agreed} onAgreeChange={setAgreed} errors={errors} />
                </div>
                <div className="flex flex-col items-start gap-4 flex-1 lg:max-w-[400px] self-stretch">
                    <CountdownTimer onExpire={() => {
                        if (lockToken) release(selectedLocation, startAt);
                        setLockToken(null);
                        localStorage.removeItem('bookingLockToken');
                    }} />
                    <AppointmentSummary />
                    <CheckoutButtons onBack={onBack} isFormValid={isFormValid} lockToken={lockToken} checkoutLoading={checkoutLoading} isDark={isDark} onCheckout={handleCheckout} release={release} locationId={selectedLocation} startAt={startAt} />
                </div>
            </div>
        </div>
    );
}