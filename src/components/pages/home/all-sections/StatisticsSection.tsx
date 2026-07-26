import { StatCard } from '../statistics/StatCard';
import { statistics } from '@/data/statistics';

export function StatisticsSection() {
    return (
        <section className="flex py-8 px-4 sm:px-6 md:px-10 lg:px-10 xl:px-10 justify-center items-center self-stretch bg-[#092544] rounded-xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full max-w-[1320px]">
                {statistics.map((stat) => (
                    <StatCard key={stat.label} value={stat.value} label={stat.label} />
                ))}
            </div>
        </section>
    );
}