import { StatCard } from '../statistics/StatCard';
import { statistics } from '@/data/statistics';

export function StatisticsSection() {
    return (
        <section className="font-bebas flex flex-wrap py-8 px-4 sm:px-6 md:px-10  justify-center items-center gap-5 self-stretch border border-white/20 bg-[#092544]">
            {statistics.map((stat) => (
                <StatCard key={stat.label} value={stat.value} label={stat.label} showStar={stat.showStar} />
            ))}
        </section>
    );
}