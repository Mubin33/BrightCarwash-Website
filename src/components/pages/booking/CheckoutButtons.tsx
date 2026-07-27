'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';

interface Props {
    onBack: () => void;
    isFormValid: boolean;
    lockToken: string | null;
    checkoutLoading: boolean;
    isDark: boolean;
    onCheckout: () => void;
    release: (locationId: string, startAt: string) => Promise<void>;
    locationId: string;
    startAt: string;
}

export function CheckoutButtons({ onBack, isFormValid, lockToken, checkoutLoading, isDark, onCheckout, release, locationId, startAt }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleBack = () => {
        // Release the lock in the background – don't block navigation
        if (lockToken) {
            release(locationId, startAt);
        }

        // Remove time-related query params so the datetime step starts fresh
        const params = new URLSearchParams(searchParams.toString());
        params.delete('time');
        params.delete('startAt');
        params.delete('teamMemberId');
        router.push(`/booking?${params.toString()}`, { scroll: false });

        onBack();
    };

    return (
        <div className="flex gap-2 self-stretch">
            <Button variant="outline" onClick={handleBack} disabled={checkoutLoading} className={`flex-1 py-[14px] px-5 justify-center rounded-xl border font-inter text-sm hover:bg-white/10 ${isDark ? 'border-white/20 bg-white/[0.02] text-white' : 'border-[#DFE1E7] bg-[#F8FAFB] text-[#1B1B1B]'}`}>Back</Button>
            <Button onClick={onCheckout} disabled={!isFormValid || !lockToken || checkoutLoading} isLoading={checkoutLoading} loadingText="Processing..." className="flex-1 py-[14px] px-5 justify-center items-center gap-2 rounded-xl bg-[#FEC300] text-black font-inter text-sm disabled:opacity-50">Confirm & Pay</Button>
        </div>
    );
}