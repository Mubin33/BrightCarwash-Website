import { Icon } from "@/components/ui/Icon";

interface Props {
    count?: number;
}

export function CartButton({ count = 0 }: Props) {
    return (
        <button
            type="button"
            className="relative flex p-2 items-center gap-3 rounded-lg border border-[#DFE1E7] bg-white"
        >
            <Icon name="cart" width={32} height={32} color="#0098E8" />
            {count > 0 && (
                <span className="flex py-[6px] px-[9px] items-center gap-2 absolute -right-[11px] -top-[11px] rounded-[99px] bg-[#B23730] text-white font-inter text-xs font-medium">
                    {count}
                </span>
            )}
        </button>
    );
}