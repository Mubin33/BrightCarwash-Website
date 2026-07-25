'use client';

import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { HeroStats } from './HeroStats';
import { QuoteForm } from './QuoteForm';
import { usePublicHero } from '@/hooks/usePublicHero';
import Link from 'next/link';
import Image from 'next/image';
import { HeroBanner } from '../../website-cms/hero/HeroBanner';
import { useState } from 'react';

const alignmentClasses: Record<string, string> = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
};

const getFullImageUrl = (imagePath: string) => {
    if (!imagePath) return '';

    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }

    const baseUrl = process.env.NEXT_PUBLIC_IMAGEURL || 'https://bridge-decent-operational-power.trycloudflare.com';

    let cleanPath = imagePath;
    if (cleanPath.startsWith('/public/')) {
        cleanPath = cleanPath.replace('/public/', '/');
    }

    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const path = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;

    return `${cleanBase}${path}`;
};

export function HeroSectionWrapper() {
    const { data, loading } = usePublicHero();
    const [imageLoaded, setImageLoaded] = useState(false);

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
    const isCentered = data.text_alignment === 'center';

    const showForm = data.status === 'form';
    const showBanner = data.status === 'banner';
    const showRightColumn = showForm || showBanner;

    const backgroundImageUrl = data.backgroundImageUrl ? getFullImageUrl(data.backgroundImageUrl) : '';
    const bannerImageUrl = data.bannerImageUrl ? getFullImageUrl(data.bannerImageUrl) : '';

    return (
        <section
            id="hero"
            className="relative flex pt-10 pb-10 px-4 md:px-6 lg:px-10 flex-col justify-center items-center gap-[10px] self-stretch overflow-hidden min-h-[500px]"
        >
            {/* Background Image – always visible */}
            <div className="absolute inset-0 z-0">
                {backgroundImageUrl ? (
                    <>
                        <Image
                            src={backgroundImageUrl}
                            alt="Hero background"
                            fill
                            className={`object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            priority
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageLoaded(true)}
                            sizes="100vw"
                            quality={90}
                            unoptimized={true}
                        />
                        {!imageLoaded && (
                            <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                        )}
                    </>
                ) : (
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: "url('/images/hero-image.png')" }}
                    />
                )}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-[1280px] xl:max-w-[1320px] 2xl:max-w-[1600px]">
                <div className={`flex flex-col ${showRightColumn ? 'lg:flex-row' : ''} items-center gap-8 md:gap-10 lg:gap-12 xl:gap-14 w-full ${showRightColumn ? '' : alignment}`}>
                    <div className={`flex flex-col ${alignment} gap-6 sm:gap-8 lg:gap-12 ${showRightColumn ? 'flex-1' : 'w-full'}`}>
                        <div className={`flex flex-col ${alignment} gap-3 sm:gap-4`}>
                            <div className={`flex flex-wrap py-[6px] px-3 items-center gap-2 sm:gap-3 rounded-lg border border-[#DCA3A0] bg-[#F7EBEA] ${isCentered ? 'justify-center' : ''}`}>
                                <Icon name="car" width={14} height={14} color="#B23730" className="sm:w-4 sm:h-4" />
                                <span className="text-[#B23730] font-inter text-[10px] xs:text-xs sm:text-sm font-normal leading-[112%]">
                                    {data.eyebrow_text}
                                </span>
                            </div>

                            <h1 className="font-bebas w-full text-5xl sm:text-6xl md:text-7xl lg:text-[56px] xl:text-[64px] 2xl:text-[90px] font-normal leading-[110%] sm:leading-[120%] tracking-[1px] sm:tracking-[2px]">
                                <span className="text-white">{data.main_headline.split('\n')[0] || ''}</span>
                                {data.main_headline.includes('\n') && (
                                    <>
                                        <br />
                                        <span className="text-[#9F9FA5]">{data.main_headline.split('\n')[1] || ''}</span>
                                    </>
                                )}
                            </h1>

                            <p className={`${showRightColumn ? 'w-full lg:w-[453px]' : 'w-full'} text-white/80 font-inter text-sm sm:text-base lg:text-md xl:text-lg font-normal leading-[140%] sm:leading-[150%]`}>
                                {data.subtext}
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className={`flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 ${showRightColumn ? 'w-full sm:w-auto' : 'w-full'} ${isCentered ? 'justify-center' : ''}`}>
                            <Link href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full sm:w-auto">
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
                        <div className={isCentered ? 'flex justify-center' : ''}>
                            <HeroStats starRating={data.star_rating} carsWashed={data.cars_washed} avgTime={data.avg_time} />
                        </div>
                    </div>

                    {showRightColumn && (
                        <div className="w-full lg:max-w-[500px] xl:max-w-[648px]">
                            {showForm && <QuoteForm />}
                            {showBanner && bannerImageUrl && (
                                <HeroBanner bannerImageUrl={bannerImageUrl} />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}