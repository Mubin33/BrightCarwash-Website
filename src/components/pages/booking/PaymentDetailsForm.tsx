'use client';

import { useTheme } from '@/contexts/ThemeContext';

const labelClass = "text-[#777980] dark:text-white/60 font-inter text-base font-normal leading-[130%]";

interface PaymentValues {
    cardNumber: string;
    expiry: string;
    cvv: string;
}

interface Props {
    values: PaymentValues;
    onChange: (values: PaymentValues) => void;
    agreed: boolean;
    onAgreeChange: (value: boolean) => void;
    disabled?: boolean;
}

function formatCardNumber(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
}

function formatExpiry(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 4);

    if (digits.length === 0) return '';

    // First digit: if > 1, auto-prefix with 0
    if (digits.length === 1) {
        const firstDigit = parseInt(digits);
        if (firstDigit > 1) {
            return `0${firstDigit}/`;
        }
        return digits;
    }

    // Two digits: validate month 01-12
    if (digits.length === 2) {
        const month = parseInt(digits);
        if (month > 12) {
            // If first digit > 1, it should have been 0X. Keep only first digit with slash
            return `0${digits[0]}/${digits[1]}`;
        }
        return `${digits}/`;
    }

    // Three or four digits
    if (digits.length >= 3) {
        const month = parseInt(digits.slice(0, 2));
        if (month > 12) {
            // Invalid month, truncate
            return `0${digits[0]}/${digits.slice(1, 3)}`;
        }
        return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }

    return digits;
}

function formatCVV(value: string): string {
    return value.replace(/\D/g, '').slice(0, 3);
}

export function PaymentDetailsForm({ values, onChange, agreed, onAgreeChange, disabled }: Props) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const update = (field: keyof PaymentValues, formatted: string) => {
        onChange({ ...values, [field]: formatted });
    };

    return (
        <div className={`flex p-4 sm:p-6 flex-col items-center gap-6 self-stretch rounded-xl border ${isDark ? 'border-white/20 bg-white/[0.04]' : 'border-[#DFE1E7] bg-white'
            }`}>
            <div className="flex flex-col items-start gap-6 self-stretch">
                <h3 className={`font-inter text-xl font-bold leading-normal ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                    Payment Details
                </h3>
                <div className="flex flex-col items-start gap-4 self-stretch">
                    <div className="flex flex-col items-start gap-2 self-stretch">
                        <label className={labelClass}>Card Number</label>
                        <input
                            type="text"
                            placeholder="4111 1111 1111 1111"
                            className={`w-full flex py-4 px-4 justify-between items-center self-stretch rounded-lg border font-inter text-sm outline-none focus:border-[#0098E8] placeholder-[#A5A5AB] ${isDark
                                ? 'border-white/20 bg-white/[0.08] text-white placeholder:text-white/30'
                                : 'border-[#DFE1E7] bg-[#F8FAFB] text-[#1D1F2C]'
                                }`}
                            value={values.cardNumber}
                            onChange={(e) => update('cardNumber', formatCardNumber(e.target.value))}
                            maxLength={19}
                            disabled={disabled}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row items-start gap-4 self-stretch">
                        <div className="flex flex-col items-start gap-2 flex-1 w-full">
                            <label className={labelClass}>MM/YY</label>
                            <input
                                type="text"
                                placeholder="12/28"
                                className={`w-full flex py-4 px-4 justify-between items-center self-stretch rounded-lg border font-inter text-sm outline-none focus:border-[#0098E8] placeholder-[#A5A5AB] ${isDark
                                    ? 'border-white/20 bg-white/[0.08] text-white placeholder:text-white/30'
                                    : 'border-[#DFE1E7] bg-[#F8FAFB] text-[#1D1F2C]'
                                    }`}
                                value={values.expiry}
                                onChange={(e) => update('expiry', formatExpiry(e.target.value))}
                                maxLength={5}
                                disabled={disabled}
                            />
                        </div>
                        <div className="flex flex-col items-start gap-2 flex-1 w-full">
                            <label className={labelClass}>CVV</label>
                            <input
                                type="text"
                                placeholder="123"
                                className={`w-full flex py-4 px-4 justify-between items-center self-stretch rounded-lg border font-inter text-sm outline-none focus:border-[#0098E8] placeholder-[#A5A5AB] ${isDark
                                    ? 'border-white/20 bg-white/[0.08] text-white placeholder:text-white/30'
                                    : 'border-[#DFE1E7] bg-[#F8FAFB] text-[#1D1F2C]'
                                    }`}
                                value={values.cvv}
                                onChange={(e) => update('cvv', formatCVV(e.target.value))}
                                maxLength={3}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                </div>
                <p className={`font-inter text-xs ${isDark ? 'text-white/40' : 'text-[#A5A5AB]'}`}>
                    Test cards: 4111 1111 1111 1111 (Success) | 4222 2222 2222 2222 (Declined) | 4444 4444 4444 4444 (Insufficient Funds)
                </p>
                <label className="flex items-center gap-2 self-stretch cursor-pointer">
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => onAgreeChange(e.target.checked)}
                        className="w-4 h-4 rounded accent-[#B23730]"
                        disabled={disabled}
                    />
                    <span className={`font-inter text-sm ${isDark ? 'text-white/70' : 'text-[#777980]'}`}>
                        I have read and agreed to the Privacy & Policy of Brightside Car Wash.
                    </span>
                </label>
            </div>
        </div>
    );
}