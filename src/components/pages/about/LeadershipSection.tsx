'use client';

import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { aboutData } from '@/data/about';
import { useTheme } from '@/contexts/ThemeContext';
import { StatisticsSection } from '../home/all-sections/StatisticsSection';

export function LeadershipSection() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section className={`flex py-20 px-4 md:px-6 lg:px-10 flex-col justify-center items-center gap-12 self-stretch ${isDark ? 'bg-[#1A1A1A]' : 'bg-[#F5F5F5]'}`}>
            <SectionHeader
                badgeIcon="car"
                badgeText="LEADERSHIP"
                heading={
                    <>
                        <div className='whitespace-nowrap'>MEET <span className="text-[#B23730]">THE PEOPLE </span><span className="">BEHIND</span></div>BRIGHTSIDE <span className='text-[#9F9FA5]'>CARWASH</span>
                    </>
                }
                subheading=""
            />
            <div>
                <div className="flex flex-col lg:flex-row items-start gap-6 w-full max-w-[1280px] xl:max-w-[1320px]">
                    {/* Card 1 - Jonathan Roldan */}
                    <div className={`flex p-6 flex-col items-start gap-8 flex-1 rounded-lg ${isDark ? 'bg-white/[0.04]' : 'bg-white'}`}>
                        <div className="flex h-80 sm:h-[450px] lg:h-[548px] p-4 flex-col justify-end items-start gap-2.5 self-stretch rounded-lg relative overflow-hidden">
                            <Image
                                src="/images/CEO-image.png"
                                alt="Jonathan Roldan - Founder & CEO"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                        <div className="flex flex-col items-start gap-4 self-stretch">
                            <div className="flex flex-col items-start gap-3 self-stretch">
                                <span className="text-[#0098E8] font-inter text-[32px] font-medium leading-[100%]">
                                    {aboutData.founder.name}
                                </span>
                                <span className={`font-inter text-sm font-normal leading-[100%] ${isDark ? 'text-white/60' : 'text-[#777980]'}`}>
                                    {aboutData.founder.title}
                                </span>
                            </div>
                            <div className={`w-full h-px ${isDark ? 'bg-white/20' : 'bg-[#D2D2D5]'}`}></div>
                            <div>
                                <span className={`font-inter text-sm font-normal leading-[100%] ${isDark ? 'text-white/60' : 'text-[#777980]'}`}>Founded by U.S. Army veteran Jonathan Roldan, Brightside was built on the values of integrity, hard work, and service. Those principles guide everything we do, from the way we care for our customers' vehicles to the way we support and develop our team members.</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className={`flex p-6 flex-col items-start gap-8 flex-1 rounded-lg ${isDark ? 'bg-white/[0.04]' : 'bg-white'}`}>
                        <div className="flex h-80 sm:h-[450px] lg:h-[548px] p-4 flex-col justify-end items-start gap-2.5 self-stretch rounded-lg relative overflow-hidden">
                            <Image
                                src="/images/elizabeth.png"
                                alt="Brightside Leadership Team"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                        <div className="flex flex-col items-start gap-4 self-stretch">
                            <div className="flex flex-col items-start gap-3 self-stretch">
                                <span className="text-[#0098E8] font-inter text-[32px] font-medium leading-[100%]">
                                    Elizabeth Quinn
                                </span>
                                <span className={`font-inter text-sm font-normal leading-[100%] ${isDark ? 'text-white/60' : 'text-[#777980]'}`}>
                                    CEO
                                </span>
                            </div>
                            <div className={`w-full h-px ${isDark ? 'bg-white/20' : 'bg-[#D2D2D5]'}`} />
                            <div>
                                <span className={`font-inter text-sm font-normal leading-[100%] ${isDark ? 'text-white/60' : 'text-[#777980]'}`}>Under the leadership of CEO Elizabeth Quinn, Brightside champions a community-first approach, emphasizing transparency, dedication, and exceptional service to ensure outstanding vehicle maintenance and unwavering support for our committed team members.</span>
                            </div>
                        </div>
                    </div>


                </div>

            </div>

        </section>
    );
}