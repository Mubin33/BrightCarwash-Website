'use client';

import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { useBooking } from '@/contexts/BookingContext';
import { useTheme } from '@/contexts/ThemeContext';
import Link from 'next/link';
import Image from 'next/image';

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

    const total = selectedServices.reduce((sum, s) => sum + s.price, 0);

    return (
        <div className="flex flex-col items-center gap-8 w-full">
            <div className="flex flex-col gap-3 w-full">
                {selectedServices.map((service) => (
                    <div
                        key={service.id}
                        className={`flex items-center gap-4 p-4 rounded-lg border ${isDark ? 'border-white/20 bg-white/[0.06]' : 'border-[#DFE1E7] bg-[#F8FAFB]'}`}
                    >
                        <div className="w-20 h-16 rounded-lg overflow-hidden relative shrink-0">
                            <Image
                                src={service.image || '/images/service.png'}
                                alt={service.name}
                                fill
                                className="object-cover"
                                unoptimized={service.image?.startsWith('http')}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className={`font-inter text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                                {service.name}
                            </h4>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-[#B23730] font-inter text-sm font-bold">${service.price}</span>
                                <span className={`font-inter text-xs ${isDark ? 'text-white/50' : 'text-[#777980]'}`}>
                                    {service.duration}
                                </span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => removeService(service.id)}
                            className="p-2 rounded-lg hover:bg-[#FFE6E6] transition-colors shrink-0"
                        >
                            <Icon name="delete" width={16} height={16} color="#FF4345" />
                        </button>
                    </div>
                ))}
            </div>

            <div className={`flex justify-between items-center self-stretch p-4 rounded-lg border ${isDark ? 'border-white/20 bg-white/[0.08]' : 'border-[#DFE1E7] bg-white'}`}>
                <span className={`font-inter text-base font-medium ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>Total</span>
                <span className="text-[#B23730] font-inter text-lg font-bold">${total}</span>
            </div>

            <div className="flex flex-col sm:flex-row w-full justify-center items-center gap-3 sm:gap-4">
                <Link href="/services" className="w-full sm:flex-1">
                    <Button variant="outline" className={`w-full py-[14px] px-5 justify-center rounded border font-inter text-sm ${isDark ? 'border-white/20 bg-white/[0.08] text-white hover:bg-white/[0.16] hover:text-white' : 'border-[#DFE1E7] bg-[#F8FAFB] text-[#1B1B1B] hover:bg-[#F1F1F1]'}`}>
                        Add another service
                    </Button>
                </Link>
                <Button onClick={onProceed} disabled={selectedServices.length === 0} className="w-full sm:flex-1 py-[14px] px-5 justify-center rounded bg-[#0098E8] text-white font-inter text-sm disabled:opacity-50">
                    Proceed to Date & Time
                </Button>
            </div>
        </div>
    );
}