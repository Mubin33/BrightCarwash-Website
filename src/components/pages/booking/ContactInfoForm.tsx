'use client';

import { useTheme } from '@/contexts/ThemeContext';

const inputClass = "flex py-4 px-4 justify-between items-center self-stretch rounded-lg border border-[#DFE1E7] bg-[#F8FAFB] text-[#1D1F2C] font-inter text-sm outline-none focus:border-[#0098E8] placeholder-[#A5A5AB]";
const labelClass = "text-[#777980] font-inter text-base font-normal leading-[130%]";

export function ContactInfoForm() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className={`flex p-4 sm:p-6 flex-col items-center gap-6 self-stretch rounded-xl border ${isDark ? 'border-white/20 bg-white/[0.04]' : 'border-[#DFE1E7] bg-white'}`}>
            <div className="flex flex-col items-start gap-6 self-stretch">
                <h3 className={`font-inter text-xl font-bold leading-normal ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                    Contact Info
                </h3>

                <div className="flex flex-col items-start gap-4 self-stretch">
                    <div className="flex flex-col sm:flex-row items-start gap-4 self-stretch">
                        <div className="flex flex-col items-start gap-2 flex-1">
                            <label className={labelClass}>First Name</label>
                            <input type="text" placeholder="John" className={inputClass} />
                        </div>
                        <div className="flex flex-col items-start gap-2 flex-1">
                            <label className={labelClass}>Last Name</label>
                            <input type="text" placeholder="Doe" className={inputClass} />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start gap-4 self-stretch">
                        <div className="flex flex-col items-start gap-2 flex-1">
                            <label className={labelClass}>Phone Number</label>
                            <input type="tel" placeholder="+1 (555) 000-0000" className={inputClass} />
                        </div>
                        <div className="flex flex-col items-start gap-2 flex-1">
                            <label className={labelClass}>Email Address</label>
                            <input type="email" placeholder="john@example.com" className={inputClass} />
                        </div>
                    </div>

                    <div className="flex flex-col items-start gap-2 self-stretch">
                        <label className={labelClass}>Appointment note (optional)</label>
                        <textarea placeholder="Add any special requests..." className={`${inputClass} h-[127px] items-start resize-none`} />
                    </div>
                </div>
            </div>
        </div>
    );
}