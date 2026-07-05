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
            className={`flex flex-col justify-center items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg border flex-1 min-w-0 transition-all ${selected
                ? 'border-[#0098E8] bg-[#F0F8FF] ring-2 ring-[#0098E8]/20'
                : 'border-[#DFE1E7] bg-[#F8FAFB] hover:border-[#0098E8]'
                }`}
        >
            <Image
                src={image}
                alt={name}
                width={120}
                height={63}
                className="w-full h-auto max-w-[80px] sm:max-w-[100px] lg:max-w-[120px] rounded-[9.756px]"
                style={{ aspectRatio: '40/21' }}
            />
            <span className="text-[#1D1F2C] font-inter text-xs sm:text-sm lg:text-base font-medium leading-[100%] truncate w-full text-center">
                {name}
            </span>
            <span className="text-[#4A4C56] font-inter text-[10px] sm:text-sm! font-normal leading-[150%] tracking-wider">
                {doors}
            </span>
        </button>
    );
}