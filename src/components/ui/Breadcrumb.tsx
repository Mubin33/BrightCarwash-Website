import Link from 'next/link';
import ArrowRightIcon from '../../../public/icons/custom/ArrowRightIcon';

interface Props {
    items: { label: string; href: string }[];
}

export function Breadcrumb({ items }: Props) {
    return (
        <div className="flex py-4 px-4 sm:px-8 lg:px-75 justify-start items-center gap-6 self-stretch bg-[#092544]">
            <div className="flex items-center gap-1.5">
                {items.map((item, i) => (
                    <div key={item.href} className="flex items-center gap-1.5">
                        {i > 0 && <span className="text-white/40 font-inter text-sm"><ArrowRightIcon /></span>}
                        {i === items.length - 1 ? (
                            <span className="text-white font-inter text-sm">{item.label}</span>
                        ) : (
                            <Link href={item.href} className="text-white/60 font-inter text-sm hover:text-white transition-colors">
                                {item.label}
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}