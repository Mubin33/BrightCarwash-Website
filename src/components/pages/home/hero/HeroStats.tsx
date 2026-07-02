import { Icon } from '@/components/ui/Icon';
const stats = [
    { icon: 'star', text: '4.9 Rating' },
    { icon: 'broom', text: '12K+ Cars Washed' },
    { icon: 'clock', text: '15-Min Average' },
];
export function HeroStats() {
    return (
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {stats.map((stat, i) => (
                <div key={stat.icon} className="flex items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-2">
                        <Icon name={stat.icon} width={20} height={20} color="#0098E8" />
                        <span className="text-white/80 font-inter text-xs sm:text-sm">{stat.text}</span>
                    </div>
                    {i < stats.length - 1 && <div className="hidden sm:block w-px h-5 bg-white/30" />}
                </div>
            ))}
        </div>
    );
}