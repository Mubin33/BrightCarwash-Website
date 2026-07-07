import { Icon } from '@/components/ui/Icon';

const stats = [
    { icon: 'star', text: '4.9 Rating' },
    { icon: 'broom', text: '12K+ Cars Washed' },
    { icon: 'clock', text: '15-Min Average' },
];

export function HeroStats() {
    return (
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            {stats.map((stat, i) => (
                <div key={stat.icon} className="flex items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <Icon name={stat.icon} width={16} height={16} color="#0098E8" className="sm:w-[18px] sm:h-[18px]" />
                        <span className="text-white/80 font-inter text-xs sm:text-sm whitespace-nowrap">{stat.text}</span>
                    </div>
                    {i < stats.length - 1 && <div className="hidden sm:block w-px h-4 sm:h-5 bg-white/30" />}
                </div>
            ))}
        </div>
    );
}