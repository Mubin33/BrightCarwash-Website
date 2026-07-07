'use client';

import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { useBooking } from '@/contexts/BookingContext';
import { useTheme } from '@/contexts/ThemeContext';
import Link from 'next/link';

interface Props {
    onProceed: () => void;
}

export function CartStep({ onProceed }: Props) {
    const { selectedServices, removeService } = useBooking();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    if (selectedServices.length === 0) {
        return (
            <div className="flex flex-col items-center gap-6 py-20 self-stretch">
                <p className={`font-inter text-lg ${isDark ? 'text-white/60' : 'text-[#777980]'}`}>
                    Your cart is empty.
                </p>
                <Link href="/services">
                    <Button className="py-[14px] px-5 rounded-lg bg-[#0098E8] text-white font-inter text-sm">
                        Browse Services
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-12 w-full">
            <div className="flex w-full items-start gap-6 flex-wrap">
                {selectedServices.map((service) => (
                    <div
                        key={service.id}
                        className={`flex p-6 flex-col items-start gap-8 flex-1 rounded-lg border min-w-[300px] ${isDark ? 'border-white/20 bg-white/[0.06]' : 'border-[#DFE1E7] bg-[#F8FAFB]'
                            }`}
                    >
                        <div className="flex justify-between items-center self-stretch">
                            <h3 className={`font-bebas-neue text-[32px] leading-[100%] ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                                {service.name}
                            </h3>
                            <button
                                type="button"
                                onClick={() => removeService(service.id)}
                                className="flex p-1.5 items-start gap-4 rounded-md border border-[#DFE1E7] bg-[#FFE6E6]"
                            >
                                <Icon name="delete" width={16} height={16} color="#FF4345" />
                            </button>
                        </div>
                        <div
                            className={`flex py-3 px-4 flex-col items-start gap-4 self-stretch rounded-md border ${isDark ? 'border-white/20 bg-white/[0.08]' : 'border-[#DFE1E7] bg-white'
                                }`}
                        >
                            <p className={`font-inter text-sm leading-[150%] ${isDark ? 'text-white/60' : 'text-[#777980]'}`}>
                                {service.description}
                            </p>
                        </div>
                        <div className="flex justify-between items-center self-stretch">
                            <span className="text-[#B23730] font-inter text-[32px] font-bold">${service.price}</span>
                            <div className="flex py-1.5 px-2 items-center gap-2 rounded-lg border border-[#DFE1E7]">
                                <Icon name="clock" width={14} height={14} color="#0098E8" />
                                <span className={`font-inter text-sm ${isDark ? 'text-white/60' : 'text-[#777980]'}`}>
                                    {service.duration}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex w-full max-w-[648px] justify-center items-center gap-4">
                <Link href="/services" className="flex-1">
                    <Button
                        variant="outline"
                        className={`w-full py-[14px] px-5 justify-center rounded border font-inter text-sm ${isDark
                            ? 'border-white/20 bg-white/[0.08] text-white'
                            : 'border-[#DFE1E7] bg-[#F8FAFB] text-[#1B1B1B]'
                            }`}
                    >
                        Add another service
                    </Button>
                </Link>
                <Button
                    onClick={onProceed}
                    className="flex-1 py-[14px] px-5 justify-center rounded bg-[#0098E8] text-white font-inter text-sm"
                >
                    Proceed to Date & Time
                </Button>
            </div>
        </div>
    );
}