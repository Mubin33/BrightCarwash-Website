import { Icon } from '@/components/ui/Icon';

interface Props {
    value: string;
    label: string;
}

export function StatCard({ value, label }: Props) {
    return (
        <div className="whitespace-nowrap flex p-3 sm:p-4 lg:p-6 flex-col justify-center items-center gap-2 lg:gap-3 rounded-lg">
            <span className="text-[#FEC300] text-center font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-normal leading-[100%] inline-flex items-center gap-2">
                {value}

            </span>
            <span className="self-stretch text-white/80 text-center font-inter text-xs sm:text-sm lg:text-base font-medium leading-[100%]">
                {label}
            </span>
        </div>
    );
}


// #FEC300