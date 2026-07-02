'use client';

import Image from 'next/image';

interface Props {
    image: string;
    name: string;
    doors: string;
    selected?: boolean;
    onClick?: () => void;
}

export function VehicleCard({ image, name, doors, selected, onClick }: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex flex-col justify-center items-center gap-2 p-3 rounded-lg border flex-1 transition-all ${selected
                ? 'border-[#0098E8] bg-[#F0F8FF] ring-2 ring-[#0098E8]/20'
                : 'border-[#DFE1E7] bg-[#F8FAFB] hover:border-[#0098E8]'
                }`}
        >
            <Image
                src={image}
                alt={name}
                width={120}
                height={63}
                className="rounded-[9.756px]"
                style={{ aspectRatio: '40/21' }}
            />
            <span className="text-[#1D1F2C] font-inter text-base font-medium leading-[100%]">
                {name}
            </span>
            <span className="text-[#4A4C56] font-inter text-xs font-normal leading-[150%]">
                {doors}
            </span>
        </button>
    );
}