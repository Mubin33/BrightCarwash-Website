import { aboutData } from '@/data/about';

export function FounderCard() {
    return (
        <div className="flex p-4 flex-col justify-center items-start gap-8 self-stretch rounded-lg border border-white/20 bg-white/[0.12]">
            <div className="flex flex-col items-start gap-3 self-stretch">
                <span className="text-[#FEC300] font-inter text-[32px] font-medium leading-[100%]">
                    {aboutData.founder.name}
                </span>
                <span className="text-white font-inter text-sm font-normal leading-[100%]">
                    {aboutData.founder.title}
                </span>
            </div>
            <div className="w-full h-px bg-white/20" />
            <p className="text-white/80 font-inter text-base font-normal leading-[160%]">
                {aboutData.founder.quote}
            </p>
        </div>
    );
}