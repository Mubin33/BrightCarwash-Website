import { Icon } from "@/components/ui/Icon";

interface Props {
  isDark: boolean;
}

export function FaqBadge({ isDark }: Props) {
  return (
    <div className="px-3 py-1.5 bg-[#b23730] rounded-lg outline outline-[#E7C1BF] inline-flex justify-start items-center gap-3">
      <div className="size-5 relative overflow-hidden">
        <Icon name="car" width={20} height={20} color="#fff" />
      </div>
      <div className="justify-start text-pink-100 text-sm font-semibold font-['Inter'] uppercase leading-4">
        FAQ
      </div>
    </div>
  );
}
