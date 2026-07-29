'use client';

import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { whyBrightsideCards } from '@/data/why-brightside';
import { useTheme } from '@/contexts/ThemeContext';
import FeatureCard from './FeatureCard';



export function WhyBrightside() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section className={`flex py-20 px-4 md:px-6 lg:px-10 flex-col justify-center items-center gap-12 self-stretch ${isDark ? 'bg-[#1A1A1A]' : 'bg-[#FFFFFF]'}`}>
            <SectionHeader
                badgeIcon="car"
                badgeText="Why Brightside"
                heading={
                    <>
                        <div className='whitespace-nowrap'>WE DON'T JUST WASH CAR WE</div>  TAKE <span className='text-[#0098E8]'>PRIDE IN EVERY</span> ONE
                    </>
                }
                subheading={[
                    'As a veteran-owned business, attention to detail isnt optional — its our standard. We',
                    <br key="break" />,
                    'treat every car like its our own, because thats what we were trained to do.'
                ]}
            />

            <div className="flex flex-col lg:flex-row items-start gap-6 w-full max-w-[1280px] xl:max-w-[1320px] ">
                {/* Left Cards Column */}
                <div className="flex flex-col items-start gap-6 w-full h-full lg:w-[312px]">
                    <FeatureCard {...whyBrightsideCards[0]} />
                    <FeatureCard {...whyBrightsideCards[1]} />
                </div>

                {/* Center Image */}
                <div className="flex-1 self-stretch rounded-md relative overflow-hidden">
                    <Image
                        src="/images/why.png"
                        alt="Brightside Car Wash"
                        fill
                        className="object-cover"

                    />
                </div>

                {/* Right Cards Column */}
                <div className="flex flex-col items-start gap-6 w-full lg:w-[312px]">
                    <FeatureCard {...whyBrightsideCards[2]} />
                    <FeatureCard {...whyBrightsideCards[3]} />
                </div>
            </div>
        </section>
    );
}