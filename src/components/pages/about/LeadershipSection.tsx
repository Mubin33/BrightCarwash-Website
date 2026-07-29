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
        <section className={`flex py-20 px-4 md:px-6 lg:px-10 flex-col justify-center items-center gap-12 self-stretch ${isDark ? 'bg-[#1A1A1A]' : 'bg-[#ffffff]'}`}>
            <SectionHeader
                badgeIcon="car"
                badgeText="LEADERSHIP"
                heading={
                    <>
                        <div className='whitespace-nowrap'>MEET THE PEOPLE <span className="">BEHIND</span></div>BRIGHTSIDE <span className='text-[#0098E8]'>CARWASH</span>
                    </>
                }
                subheading={[
                    'Two leaders, one mission, veteran - grade standards',
                    <br key="break" />,
                    'and genuine care for every customer we serve.'
                ]}
            />
            <div>
                <div className={`flex flex-col lg:flex-row items-start gap-6 w-full max-w-330`}>
                    {/* Card 1 - Jonathan Roldan */}
                    <div className={`flex-1 rounded-lg outline-none inline-flex flex-col justify-start items-start gap-6 ${isDark ? 'bg-[#252019] text-white' : 'bg-[#F8FAFB] text-[#1D1F2C] border border-[#DFE1E7]'}`}>
                        <div className={`${isDark ? 'border border-[#FEC300]' : ''} self-stretch p-6 bg-sky-950 rounded-lg flex flex-col justify-start items-start gap-4 overflow-hidden `}>
                            <div className="relative w-full h-137 rounded-lg overflow-hidden">
                                <Image
                                    src="/images/CEO-image.png"
                                    alt="Jonathan Roldan - Founder & CEO"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                            <div className="self-stretch inline-flex justify-between items-center">
                                <div className="flex-1 inline-flex flex-col justify-center items-start gap-3">
                                    <div className="justify-start text-white text-3xl font-normal font-bebas leading-8 tracking-wide">
                                        {aboutData.founder.name}
                                    </div>
                                    <div className="justify-start text-yellow-400 text-sm font-normal font-['Inter'] leading-4">
                                        {aboutData.founder.title}
                                    </div>
                                </div>
                                <div className="px-3 py-1.5 bg-red-700 rounded-lg flex justify-start items-center gap-3">
                                    <div className="justify-start text-pink-100 text-sm font-semibold font-['Inter'] uppercase leading-4 tracking-widest">
                                        US. ARMY veteran
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch flex flex-col justify-start items-start gap-4">
                            <div className="self-stretch px-6 py-4 inline-flex justify-center items-center gap-2.5">
                                <div className="flex-1 text-justify justify-start text-base font-normal font-['Inter'] leading-6">
                                    After serving in the U.S. Army, Jonathan founded Brightside on the values of integrity, hard work, and service. Those same principles guide everything we do from how we care for every vehicle to how we support and develop our team.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 - Elizabeth Quinn */}
                    <div className={`flex-1 rounded-lg outline-none inline-flex flex-col justify-start items-start gap-6 ${isDark ? 'bg-[#252019] text-white' : 'bg-[#F8FAFB] text-[#1D1F2C] border border-[#DFE1E7]'}`}>
                        <div className={`${isDark ? 'border border-[#FEC300]' : ''} self-stretch p-6 bg-sky-950 rounded-lg flex flex-col justify-start items-start gap-4 overflow-hidden `}>
                            <div className="relative w-full h-137 rounded-lg overflow-hidden">
                                <Image
                                    src="/images/elizabeth.png"
                                    alt="Brightside Leadership Team"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                            <div className="self-stretch inline-flex justify-between items-center">
                                <div className="flex-1 inline-flex flex-col justify-center items-start gap-3">
                                    <div className="justify-start text-white text-3xl font-bebas! leading-8 tracking-wide">
                                        Elizabeth Quinn
                                    </div>
                                    <div className="justify-start text-yellow-400 text-sm font-normal leading-4">
                                        CEO
                                    </div>
                                </div>
                                <div className="px-3 py-1.5 bg-red-700 rounded-lg flex justify-start items-center gap-3">
                                    <div className="justify-start text-pink-100 text-sm font-semibold uppercase leading-4 tracking-widest">
                                        Vetaran Family
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch flex flex-col justify-start items-start gap-4">
                            <div className="self-stretch px-6 py-4 inline-flex justify-center items-center gap-2.5">
                                <div className="flex-1 text-justify justify-start text-base font-normal leading-6">
                                    Under the leadership of CEO Elizabeth Quinn, Brightside champions a community-first approach, emphasizing transparency, dedication, and exceptional service to ensure outstanding vehicle maintenance and unwavering support for our committed team members.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pt-8'>
                    <StatisticsSection />
                </div>
            </div>
        </section>
    );
}