import { Icon } from '@/components/ui/Icon';

interface Props {
    value: string;
    label: string;
    showStar?: boolean;
}

export function StatCard({ value, label, showStar }: Props) {
    return (
        <div className="flex w-[315px] p-6 flex-col justify-center items-center gap-3 rounded-lg">
            <span className="text-[#FEC300] text-center font-bebas-neue text-[56px] font-normal leading-[100%] inline-flex items-center gap-2">
                {value}
                {showStar && <Icon name="star" width={45} height={45} color="#FEC300" />}
            </span>
            <span className="self-stretch text-white/80 text-center font-inter text-base font-medium leading-[100%]">
                {label}
            </span>
        </div>
    );
}