'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'react-toastify';

interface ContactValues {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    note: string;
}

interface Props {
    values: ContactValues;
    onChange: (values: ContactValues) => void;
    disabled?: boolean;
}

export function ContactInfoForm({ values, onChange, disabled }: Props) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const inputClass = `flex py-4 px-4 justify-between items-center self-stretch rounded-lg border font-inter text-sm outline-none focus:border-[#0098E8] placeholder-[#A5A5AB] ${isDark
        ? 'border-white/20 bg-white/[0.08] text-white placeholder:text-white/30'
        : 'border-[#DFE1E7] bg-[#F8FAFB] text-[#1D1F2C]'
        }`;
    const labelClass = "text-[#777980] dark:text-white/60 font-inter text-base font-normal leading-[130%]";

    const update = (field: keyof ContactValues, value: string) => {
        onChange({ ...values, [field]: value });
    };

    const handleNameChange = (field: 'firstName' | 'lastName', value: string) => {
        const cleaned = value.replace(/[0-9]/g, '');
        update(field, cleaned);
    };

    const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (/[0-9]/.test(e.key)) {
            e.preventDefault();
            toast.warning('Numbers are not allowed in name fields');
        }
    };

    const handlePhoneChange = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 10);
        let formatted = digits;
        if (digits.length > 3) formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        if (digits.length > 6) formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
        update('phone', formatted);
    };

    return (
        <div className={`flex p-4 sm:p-6 flex-col items-center gap-6 self-stretch rounded-xl border ${isDark ? 'border-white/20 bg-white/[0.04]' : 'border-[#DFE1E7] bg-white'
            }`}>
            <div className="flex flex-col items-start gap-6 self-stretch">
                <h3 className={`font-inter text-xl font-bold leading-normal ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>Contact Info</h3>
                <div className="flex flex-col items-start gap-4 self-stretch">
                    <div className="flex flex-col sm:flex-row items-start gap-4 self-stretch">
                        <div className="w-full flex flex-col items-start gap-2 flex-1">
                            <label className={labelClass}>First Name</label>
                            <input
                                type="text"
                                placeholder="John"
                                className={inputClass}
                                value={values.firstName}
                                onChange={(e) => handleNameChange('firstName', e.target.value)}
                                onKeyDown={handleNameKeyDown}
                                disabled={disabled}
                            />
                        </div>
                        <div className="w-full flex flex-col items-start gap-2 flex-1">
                            <label className={labelClass}>Last Name</label>
                            <input
                                type="text"
                                placeholder="Doe"
                                className={inputClass}
                                value={values.lastName}
                                onChange={(e) => handleNameChange('lastName', e.target.value)}
                                onKeyDown={handleNameKeyDown}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start gap-4 self-stretch">
                        <div className="w-full flex flex-col items-start gap-2 flex-1">
                            <label className={labelClass}>Phone Number</label>
                            <input
                                type="tel"
                                placeholder="(555) 000-0000"
                                className={inputClass}
                                value={values.phone}
                                onChange={(e) => handlePhoneChange(e.target.value)}
                                maxLength={14}
                                disabled={disabled}
                            />
                        </div>
                        <div className="w-full flex flex-col items-start gap-2 flex-1">
                            <label className={labelClass}>Email Address</label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                className={inputClass}
                                value={values.email}
                                onChange={(e) => update('email', e.target.value)}
                                onBlur={(e) => {
                                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                    if (e.target.value && !emailRegex.test(e.target.value)) {
                                        toast.warning('Please enter a valid email address');
                                    }
                                }}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 self-stretch">
                        <label className={labelClass}>Appointment note (optional)</label>
                        <textarea
                            placeholder="Add any special requests..."
                            className={`${inputClass} h-[127px] items-start resize-none`}
                            value={values.note}
                            onChange={(e) => update('note', e.target.value)}
                            disabled={disabled}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}