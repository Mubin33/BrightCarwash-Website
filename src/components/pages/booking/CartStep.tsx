'use client';

import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { useBooking } from '@/contexts/BookingContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useCartSummary } from '@/hooks/useCartSummary';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
    onProceed: () => void;
}

export function CartStep({ onProceed }: Props) {
    const { selectedServices, selectedLocation, removeService } = useBooking();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const { summary } = useCartSummary(
        selectedLocation,
        selectedServices.map((s) => s.variationId)
    );

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

    const subtotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
    const tax = summary ? summary.taxInCents / 100 : null;
    const hasTax = tax !== null && tax > 0;
    const total = summary ? summary.totalInCents / 100 : subtotal;

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
                            className="p-2 rounded-lg hover:bg-[#FFE6E6] transition-colors shrink-0 cursor-pointer"
                        >
                            <Icon name="delete" width={16} height={16} color="#FF4345" />
                        </button>
                    </div>
                ))}
            </div>

            <div className={`flex flex-col gap-3 self-stretch p-4 rounded-lg border ${isDark ? 'border-white/20 bg-white/[0.08]' : 'border-[#DFE1E7] bg-white'}`}>
                <div className="flex justify-between items-center self-stretch">
                    <span className={`font-inter text-sm sm:text-base font-medium ${isDark ? 'text-white/80' : 'text-[#4A4C56]'}`}>Subtotal</span>
                    <span className={`font-inter text-sm sm:text-base font-semibold ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center self-stretch">
                    <span className={`font-inter text-xs sm:text-sm ${isDark ? 'text-white/60' : 'text-[#777980]'}`}>Estimated Tax</span>
                    <span className={`font-inter text-xs sm:text-sm ${isDark ? 'text-white/80' : 'text-[#4A4C56]'}`}>
                        {hasTax ? `$${tax.toFixed(2)}` : 'Calculated at checkout'}
                    </span>
                </div>
                <div className={`w-full h-px ${isDark ? 'bg-white/10' : 'bg-[#DFE1E7]'}`} />
                <div className="flex justify-between items-center self-stretch">
                    <span className={`font-inter text-base font-medium ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                        {hasTax ? 'Estimated Total' : 'Total'}
                    </span>
                    <span className="text-[#B23730] font-inter text-lg font-bold">${total.toFixed(2)}</span>
                </div>
                <p className={`font-inter text-xs text-right ${isDark ? 'text-white/50' : 'text-[#777980]'}`}>
                    Taxes calculated at checkout
                </p>
            </div>

            <div className="flex flex-col sm:flex-row w-full justify-center items-center gap-3 sm:gap-4">
                <Link href="/services" className="w-full sm:flex-1">
                    <Button variant="outline" className={`w-full py-[14px] px-5 justify-center rounded border font-inter text-sm ${isDark ? 'border-white/20 bg-white/[0.08] text-white hover:bg-white/[0.16] hover:text-white' : 'border-[#DFE1E7] bg-[#F8FAFB] text-[#1B1B1B] hover:bg-[#F1F1F1]'}`}>
                        Add another service
                    </Button>
                </Link>
                <Button onClick={onProceed} disabled={selectedServices.length === 0} className="w-full sm:flex-1 py-[14px] px-5 justify-center rounded bg-[#FEC300] text-black font-inter text-sm disabled:opacity-50">
                    Proceed to Date & Time
                </Button>
            </div>
        </div>
    );
}