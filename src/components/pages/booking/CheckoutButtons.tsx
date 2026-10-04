'use client';

import { Button } from '@/components/ui/Button';

interface Props {
    onBack: () => void;
    lockToken: string | null;
    pricingReady: boolean;
    checkoutLoading: boolean;
    checkoutBlocked?: boolean;
    isDark: boolean;
    onCheckout: () => void;
}

export function CheckoutButtons({
    onBack,
    lockToken,
    pricingReady,
    checkoutLoading,
    checkoutBlocked = false,
    isDark,
    onCheckout,
}: Props) {
    return (
        <div className="flex gap-2 self-stretch">
            <Button
                variant="outline"
                onClick={onBack}
                disabled={checkoutLoading}
                className={`flex-1 py-[14px] px-5 justify-center rounded-xl border font-inter text-sm hover:bg-white/10 ${isDark ? 'border-white/20 bg-white/[0.02] text-white' : 'border-[#DFE1E7] bg-[#F8FAFB] text-[#1B1B1B]'}`}
            >
                Back
            </Button>
            <Button
                onClick={onCheckout}
                disabled={!lockToken || checkoutLoading || checkoutBlocked || !pricingReady}
                isLoading={checkoutLoading}
                loadingText="Processing..."
                className="flex-1 py-[14px] px-5 justify-center items-center gap-2 rounded-xl bg-[#FEC300] text-black font-inter text-sm disabled:opacity-50"
            >
                Confirm & Pay
            </Button>
        </div>
    );
}