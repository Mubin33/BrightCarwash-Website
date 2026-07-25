import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { aboutData } from '@/data/about';
import { FounderCard } from './FounderCard';

export function AboutSectionWrapper() {
    return (
        <section className="flex py-20 px-4 md:px-6 lg:px-10 flex-col justify-center items-center gap-12 self-stretch bg-[#092544]">
            <div className="flex flex-col lg:flex-row items-start gap-6 w-full max-w-[1280px] xl:max-w-[1320px] 2xl:max-w-[1600px]">
                {/* Left Content */}
                <div className="flex w-full lg:w-[648px] flex-col items-start gap-6 self-stretch">
                    <SectionHeader
                        badgeIcon="car"
                        badgeText={aboutData.badgeText}
                        align="start"
                        heading={
                            <>
                                <span className="text-[#FFFFFF]">{aboutData.heading.prefix} </span>
                                <span className="text-[#B23730]">{aboutData.heading.accent}</span>{' '}
                                <span className="text-[#FFFFFF]">{aboutData.heading.prefix2} </span>
                                <span className="text-[#A5A5AB]">{aboutData.heading.suffix}</span>
                            </>
                        }
                        subheading=""
                    />

                    {aboutData.paragraphs.map((text, i) => (
                        <p
                            key={i}
                            className="text-white/80 font-inter text-sm sm:text-base font-normal leading-[160%] self-stretch"
                        >
                            {text}
                        </p>
                    ))}

                    <div className="flex p-4 flex-col justify-end items-center gap-2.5 flex-1 self-stretch rounded-lg relative overflow-hidden min-h-[250px] sm:min-h-[300px]">
                        <Image
                            src="/images/about-us-service-image.jpg"
                            alt="Brightside car wash service"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 648px"
                        />
                    </div>
                </div>

                {/* Right Content */}
                <div className="flex w-full lg:flex-1 flex-col justify-between! items-start gap-6 self-stretch">
                    <div className="flex h-60 sm:h-80 lg:h-[548px] p-4 flex-col justify-end items-start gap-2.5 self-stretch rounded-lg relative overflow-hidden">
                        <Image
                            src="/images/CEO-image.png"
                            alt="Jonathan Roldan - Founder"
                            fill
                            className="object-fit"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                    <FounderCard />
                </div>
            </div>
        </section>
    );
}