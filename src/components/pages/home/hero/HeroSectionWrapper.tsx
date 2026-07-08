'use client';

import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { MoveUpRight } from 'lucide-react';
import { HeroStats } from './HeroStats';
import { QuoteForm } from './QuoteForm';
import Link from 'next/link';

export function HeroSectionWrapper() {
    return (
        <section
            className="flex pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-10 px-4 sm:px-6 md:px-10 lg:px-6 xl:px-40 2xl:px-[300px] flex-col justify-center items-center gap-[10px] self-stretch min-h-screen"
            style={{
                background: `linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%), url('/images/hero-image.png') lightgray 50% / cover no-repeat`,
            }}
        >
            <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-10 lg:gap-12 xl:gap-14 self-stretch">
                {/* Left Content */}
                <div className="flex flex-col items-start gap-6 sm:gap-8 lg:gap-12 flex-1 w-full">
                    <div className="flex flex-col items-start gap-3 sm:gap-4">
                        {/* Badge */}
                        <div className="flex flex-wrap py-[6px] px-3 items-center gap-2 sm:gap-3 rounded-lg border border-[#DCA3A0] bg-[#F7EBEA]">
                            <Icon name="car" width={14} height={14} color="#B23730" className="sm:w-4 sm:h-4" />
                            <span className="text-[#B23730] font-inter text-[10px] xs:text-xs sm:text-sm font-normal leading-[112%]">
                                Veteran-Owned | Naperville, IL | EST. 2025
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className="font-bebas w-full text-5xl sm:text-6xl md:text-7xl lg:text-[72px] xl:text-[80px] 2xl:text-[80px] font-normal leading-[110%] sm:leading-[120%] tracking-[1px] sm:tracking-[2px]">
                            <span className="text-white">YOUR </span>
                            <span className="text-[#B23730]">CAR DESERVES A</span>
                            <br />
                            <span className="text-[#9F9FA5]">BRIGHTER </span>
                            <span className="text-white">STANDARD.</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="w-full lg:w-[453px] xl:w-[500px] text-white/80 font-inter text-sm sm:text-base lg:text-lg font-normal leading-[140%] sm:leading-[150%]">
                            Book online in 60 seconds. Pay a small deposit to lock in your spot — and we&apos;ll handle the rest.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
                        <Link
                            href="#services"
                            onClick={(e) => {
                                e.preventDefault();
                                const section = document.getElementById('services');
                                if (section) section.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="w-full sm:w-auto"
                        >
                            <Button className="w-full sm:w-auto flex py-[14px] px-5 justify-center items-center gap-2 rounded bg-[#0098E8] text-white font-inter text-sm font-medium hover:bg-[#0088D8]">
                                Book my wash
                                <Icon name="book" width={16} height={16} color="white" />
                            </Button>
                        </Link>
                        <Link href="/services" className="w-full sm:w-auto">
                            <Button variant="outline" className="w-full sm:w-auto flex py-[14px] px-5 justify-center items-center gap-2 rounded border border-white/30 text-white font-inter text-sm font-medium hover:bg-white/10">
                                See our services
                            </Button>
                        </Link>
                    </div>

                    {/* Stats */}
                    <HeroStats />
                </div>

                {/* Right Form */}
                <div className="w-full lg:max-w-[600px] xl:max-w-[648px]">
                    <QuoteForm />
                </div>
            </div>
        </section>
    );
}