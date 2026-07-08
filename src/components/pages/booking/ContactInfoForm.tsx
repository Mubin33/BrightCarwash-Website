'use client';

import { useTheme } from '@/contexts/ThemeContext';

const inputClass = "flex py-4 px-4 justify-between items-center self-stretch rounded-lg border border-[#DFE1E7] bg-[#F8FAFB] text-[#1D1F2C] font-inter text-sm outline-none focus:border-[#0098E8] placeholder-[#A5A5AB]";
const labelClass = "text-[#777980] font-inter text-base font-normal leading-[130%]";

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
}

export function ContactInfoForm({ values, onChange }: Props) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const update = (field: keyof ContactValues, value: string) => {
        onChange({ ...values, [field]: value });
    };

    return (
        <div className={`flex p-4 sm:p-6 flex-col items-center gap-6 self-stretch rounded-xl border ${isDark ? 'border-white/20 bg-white/[0.04]' : 'border-[#DFE1E7] bg-white'}`}>
            <div className="flex flex-col items-start gap-6 self-stretch">
                <h3 className={`font-inter text-xl font-bold leading-normal ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>Contact Info</h3>
                <div className="flex flex-col items-start gap-4 self-stretch">
                    <div className="flex flex-col sm:flex-row items-start gap-4 self-stretch">
                        <div className="flex flex-col items-start gap-2 flex-1">
                            <label className={labelClass}>First Name</label>
                            <input type="text" placeholder="John" className={inputClass} value={values.firstName} onChange={(e) => update('firstName', e.target.value)} />
                        </div>
                        <div className="flex flex-col items-start gap-2 flex-1">
                            <label className={labelClass}>Last Name</label>
                            <input type="text" placeholder="Doe" className={inputClass} value={values.lastName} onChange={(e) => update('lastName', e.target.value)} />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start gap-4 self-stretch">
                        <div className="flex flex-col items-start gap-2 flex-1">
                            <label className={labelClass}>Phone Number</label>
                            <input type="tel" placeholder="+1 (555) 000-0000" className={inputClass} value={values.phone} onChange={(e) => update('phone', e.target.value)} />
                        </div>
                        <div className="flex flex-col items-start gap-2 flex-1">
                            <label className={labelClass}>Email Address</label>
                            <input type="email" placeholder="john@example.com" className={inputClass} value={values.email} onChange={(e) => update('email', e.target.value)} />
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 self-stretch">
                        <label className={labelClass}>Appointment note (optional)</label>
                        <textarea placeholder="Add any special requests..." className={`${inputClass} h-[127px] items-start resize-none`} value={values.note} onChange={(e) => update('note', e.target.value)} />
                    </div>
                </div>
            </div>
        </div>
    );
}