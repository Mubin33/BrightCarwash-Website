import { StatCard } from './statistics/StatCard';
import { statistics } from '@/data/statistics';

export function StatisticsSection() {
    return (
        <section className="flex py-8 px-[300px] justify-center items-center gap-5 self-stretch border border-white/20 bg-[#092544]">
            {statistics.map((stat) => (
                <StatCard key={stat.label} value={stat.value} label={stat.label} showStar={stat.showStar} />
            ))}
        </section>
    );
}