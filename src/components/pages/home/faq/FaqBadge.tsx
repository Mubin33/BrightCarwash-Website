import { Icon } from '@/components/ui/Icon';

interface Props {
    isDark: boolean;
}

export function FaqBadge({ isDark }: Props) {
    return (
        <div className="px-3 py-1.5 bg-red-700 rounded-lg outline outline-1 outline-offset-[-1px] outline-red-200 inline-flex justify-start items-center gap-3">
            <div className="size-5 relative overflow-hidden">
                <Icon name="car" width={20} height={20} color="#FEC300" />
            </div>
            <div className="justify-start text-pink-100 text-sm font-semibold font-['Inter'] uppercase leading-4">
                FAQ
            </div>
        </div>
    );
}