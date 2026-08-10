'use client';

import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { HeroBanner } from './HeroBanner';
import { usePublicHero } from '@/hooks/usePublicHero';
import Link from 'next/link';
import { HeroStats } from './HeroStats';
import { QuoteForm } from '../../home/hero/QuoteForm';

const alignmentClasses: Record<string, string> = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
};

export function HeroSectionWrapper() {
    const { data, loading } = usePublicHero();

    if (loading) {
        return (
            <section className="flex pt-10 pb-10 px-4 md:px-6 lg:px-10 flex-col justify-center items-center gap-[10px] self-stretch bg-[#0B1220]">
                <div className="w-full max-w-[1280px] h-[400px] bg-gray-800 animate-pulse rounded-xl" />
            </section>
        );
    }
    if (!data) {
        return null;
    }

    const alignment = alignmentClasses[data.text_alignment] || alignmentClasses.left;
    const showRightColumn = data.status !== 'hidden';

    return (
        <section
            id="hero"
            className="flex pt-10 pb-10 px-4 md:px-6 lg:px-10 flex-col justify-center items-center gap-[10px] self-stretch"
            style={{
                background: data.backgroundImageUrl
                    ? `linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%), url(${data.backgroundImageUrl}) lightgray 50% / cover no-repeat`
                    : `linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%), url('/images/hero-image.png') lightgray 50% / cover no-repeat`,
            }}
        >
            <div className={`flex flex-col ${showRightColumn ? 'lg:flex-row' : ''} items-center gap-8 md:gap-10 lg:gap-12 xl:gap-14 w-full max-w-[1280px] xl:max-w-[1320px]  ${showRightColumn ? '' : alignment}`}>
                {/* Left Content */}
                <div className={`flex flex-col ${alignment} gap-6 sm:gap-8 lg:gap-12 ${showRightColumn ? 'flex-1' : 'w-full'}`}>
                    <div className={`flex flex-col ${alignment} gap-3 sm:gap-4`}>
                        {/* Badge */}
                        <div className="flex flex-wrap py-[6px] px-3 items-center gap-2 sm:gap-3 rounded-lg border border-[#DCA3A0] bg-[#F7EBEA]">
                            <Icon name="car" width={14} height={14} color="#B23730" className="sm:w-4 sm:h-4" />
                            <span className="text-[#B23730] font-inter text-[10px] xs:text-xs sm:text-sm font-normal leading-[112%]">
                                {data.eyebrow_text}
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className="font-bebas w-full text-5xl sm:text-6xl md:text-7xl lg:text-[56px] xl:text-[64px]  font-normal leading-[110%] sm:leading-[120%] tracking-[1px] sm:tracking-[2px]">
                            <span className="text-white">{data.main_headline?.split('\n')[0] || ''}</span>
                            {data.main_headline?.includes('\n') && (
                                <>
                                    <br />
                                    <span className="text-[#9F9FA5]">{data.main_headline.split('\n')[1] || ''}</span>
                                </>
                            )}
                        </h1>

                        {/* Subtitle */}
                        <p className={`${showRightColumn ? 'w-full lg:w-[453px]' : 'w-full'} text-white/80 font-inter text-sm sm:text-base lg:text-md xl:text-lg font-normal leading-[140%] sm:leading-[150%]`}>
                            {data.subtext}
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className={`flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 ${showRightColumn ? 'w-full sm:w-auto' : 'w-full'}`}>
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
                    <HeroStats
                        starRating={data.star_rating}
                        carsWashed={data.cars_washed}
                        avgTime={data.avg_time}
                    />
                </div>

                {/* Right Column */}
                {showRightColumn && (
                    <div className="w-full lg:max-w-[500px] xl:max-w-[648px]">
                        {data.status === 'form' && <QuoteForm />}
                        {data.status === 'banner' && data.bannerImageUrl && (
                            <HeroBanner bannerImageUrl={data.bannerImageUrl} />
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}