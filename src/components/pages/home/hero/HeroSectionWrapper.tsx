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
            className=" flex py-10 px-4 sm:px-6 md:px-10 lg:px-[300px] flex-col justify-center items-center gap-[10px] self-stretch min-h-screen"
            style={{
                background: `linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%), url('/images/hero-image.png') lightgray 50% / cover no-repeat`,
            }}
        >
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 self-stretch">
                {/* Left Content */}
                <div className="flex flex-col items-start gap-8 lg:gap-12 flex-1 w-full md:pt-20 sm:pt-50">
                    <div className="flex flex-col items-start gap-3">
                        {/* Badge */}
                        <div className="flex flex-wrap py-[6px] px-3 items-center gap-3 rounded-lg border border-[#DCA3A0] bg-[#F7EBEA]">
                            <Icon name="car" width={16} height={16} color="#B23730" />
                            <span className="text-[#B23730] font-inter text-xs sm:text-sm font-normal leading-[112%]">
                                Veteran-Owned | Naperville, IL | EST. 2025
                            </span>
                        </div>
                        {/* Headline */}
                        <h1 className="font-bebas w-full lg:w-[536px]  text-4xl sm:text-5xl lg:pt-0  md:text-6xl lg:text-[72px] font-normal leading-[120%] tracking-[2px]">
                            <span className="text-white">YOUR </span>
                            <span className="text-[#B23730]">CAR DESERVES A</span>
                            <br />
                            <span className="text-[#9F9FA5]">BRIGHTER </span>
                            <span className="text-white">STANDARD.</span>
                        </h1>
                        {/* Subtitle */}
                        <p className="w-full lg:w-[453px] text-white/80 font-inter! text-base lg:text-lg font-normal leading-[140%]">
                            Book online in 60 seconds. Pay a small deposit to lock in your spot — and we&apos;ll handle the rest.
                        </p>
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-wrap items-center gap-4">
                        <Link
                            href="#services"
                            onClick={(e) => {
                                e.preventDefault();
                                const section = document.getElementById('services');
                                if (section) section.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            <Button className="flex py-[14px] px-5 justify-center items-center gap-2 rounded bg-[#0098E8] text-white font-inter text-sm font-medium hover:bg-[#0088D8]">
                                Book my wash
                                <Icon name="book" width={20} height={20} />
                            </Button>
                        </Link>
                        <Link href="/services">
                            <Button variant="outline" className="flex py-[14px] px-5 justify-center items-center gap-2 rounded border border-[#DFE1E7] text-white font-inter text-sm font-medium hover:bg-white/10">
                                See our services
                            </Button>
                        </Link>
                    </div>
                    {/* Stats */}
                    <HeroStats />
                </div>
                {/* Right Form */}
                <QuoteForm />
            </div>
        </section>
    );
}