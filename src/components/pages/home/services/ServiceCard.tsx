'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import type { ServiceData } from '@/data/services';

interface Props {
    service: ServiceData;
    selected?: boolean;
    onSelect: (id: string) => void;
    onConfirmBooking?: (service: ServiceData) => void;
}

export function ServiceCard({ service, selected, onSelect, onConfirmBooking }: Props) {
    const [expanded, setExpanded] = useState(true);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const handleConfirmBooking = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onConfirmBooking) onConfirmBooking(service);
    };

    return (
        <div
            onClick={() => onSelect(service.id)}
            className={`flex w-full p-4 sm:p-6 flex-col items-start gap-6 sm:gap-8 rounded-lg border transition-all cursor-pointer ${selected
                    ? 'border-[#0098E8] bg-[#092544]'
                    : isDark
                        ? 'border-white/20 bg-white/[0.06] hover:bg-white/[0.12] hover:border-[#0098E8]/30'
                        : 'border-[#DFE1E7] bg-white hover:bg-[#F0F8FF] hover:border-[#0098E8]/30'
                }`}
        >
            {/* Image */}
            <div className="flex h-52 sm:h-64 lg:h-[276px] p-4 flex-col justify-end items-center gap-2.5 self-stretch rounded-lg relative overflow-hidden">
                <Image
                    src="/images/service.png"
                    alt={service.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 380px, 424px"
                />
                {selected && (
                    <span className="absolute top-3 right-3 bg-[#006F1F] text-white text-xs px-2 py-1 rounded-full font-inter z-10">
                        Selected
                    </span>
                )}
            </div>

            {/* Name */}
            <h3
                className={`font-bebas self-stretch text-[32px] font-normal leading-[100%] truncate ${selected ? 'text-white' : isDark ? 'text-white' : 'text-[#1D1F2C]'
                    }`}
            >
                {service.name.split(' ').slice(0, 5).join(' ')}
            </h3>

            {/* Price & Duration */}
            <div className="font-inter flex justify-between items-center self-stretch flex-wrap gap-2">
                <span className="font-inter text-[#B23730] text-[42px] font-bold leading-[100%]">
                    ${service.price}
                </span>
                <div
                    className={`flex py-1.5 px-2 items-center gap-2 rounded-lg border ${isDark && !selected ? 'border-white/20' : 'border-[#DFE1E7]'
                        }`}
                >
                    <Icon name="clock" width={20} height={20} color={selected ? '#FFFFFF' : isDark ? '#FFFFFF' : '#4A4C56'} />
                    <span
                        className={`font-inter text-md ${selected ? 'text-white/80' : isDark ? 'text-white/60' : 'text-[#777980]'
                            }`}
                    >
                        {service.duration}
                    </span>
                </div>
            </div>

            {/* Expandable Details */}
            <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
                className={`flex w-full py-3 px-4 flex-col items-start gap-4 rounded-md border ${isDark && !selected ? 'border-white/20 bg-white/[0.08]' : 'border-[#DFE1E7] bg-[#F8FAFB]'
                    }`}
            >
                <div className="flex justify-between items-center self-stretch">
                    <span className={`font-inter text-sm ${isDark && !selected ? 'text-white' : 'text-[#1D1F2C]'}`}>
                        {expanded ? 'Hide details' : 'Show details'}
                    </span>
                    {expanded ? (
                        <ChevronUp size={16} className="text-[#777980]" />
                    ) : (
                        <ChevronDown size={16} className="text-[#777980]" />
                    )}
                </div>
                {expanded && (
                    <p className={`font-inter text-start text-sm leading-[150%] ${isDark && !selected ? 'text-white/60' : 'text-[#777980]'}`}>
                        {service.description}
                    </p>
                )}
            </button>

            {/* Button */}
            <div className="w-full mt-auto">
                {selected ? (
                    <Button onClick={handleConfirmBooking} className="w-full py-[14px] px-5 justify-center items-center gap-2 rounded-lg bg-[#0098E8] text-white font-inter text-sm">
                        Confirm booking - pay deposit
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        onClick={(e) => { e.stopPropagation(); onSelect(service.id); }}
                        className={`w-full py-[14px] px-5 justify-center items-center gap-2 rounded-lg font-inter text-sm ${isDark ? 'border-white/20 bg-white/[0.08] text-white hover:bg-white/[0.16]' : 'bg-white hover:bg-[#F8FAFB]'
                            }`}
                    >
                        Add to cart
                    </Button>
                )}
            </div>
        </div>
    );
}