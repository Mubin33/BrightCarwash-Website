import { SectionHeader } from '@/components/ui/SectionHeader';
import Image from 'next/image';

export function WhoWeAre() {
    return (
        <section className="flex py-20 px-4 md:px-6 lg:px-10 flex-col justify-center items-center gap-12 self-stretch">
            <SectionHeader
                badgeIcon="car"
                badgeText="Who We Are"
                heading={
                    <>
                        <div className='whitespace-nowrap'>TRUSTED <span className="text-[#B23730]">CAR CARE EXPERTS</span> LOCATED</div>  IN NAPERVILLE,<span className='text-[#9F9FA5]'>READY TO HELP</span>
                    </>
                }
                subheading=""
            />

            <div className="flex flex-col lg:flex-row items-start gap-6 w-full max-w-[1280px] xl:max-w-[1320px] ">
                {/* Left */}
                <div className="flex flex-col items-start gap-6 flex-1 self-stretch">
                    <p className="text-[#4A4C56] dark:text-white/80 text-justify font-inter text-lg sm:text-xl font-normal leading-[160%] self-stretch">
                        At Brightside Car Wash, we&apos;re more than just a car wash — we&apos;re a locally owned, community-focused business committed to providing exceptional full-service car care in Naperville. As a veteran-owned and family-operated company, we take pride in delivering outstanding service, treating every customer with respect, and creating a welcoming experience for families, commuters, and businesses alike.
                    </p>
                    <div className="flex p-4 flex-col justify-end items-center gap-2.5 flex-1 self-stretch rounded-lg relative overflow-hidden min-h-[300px]">
                        <Image
                            src="/images/whoweare.jpg"
                            alt="Brightside Car Wash team"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                </div>

                {/* Right */}
                <div className="flex flex-col items-start gap-6 flex-1 self-stretch">
                    <div className="flex p-4 flex-col justify-end items-center gap-2.5 flex-1 self-stretch rounded-lg relative overflow-hidden min-h-[300px]">
                        <Image
                            src="/images/whoweare2.png"
                            alt="Brightside Car Wash service"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                    <p className="text-[#4A4C56] dark:text-white/80 text-justify font-inter text-lg sm:text-xl font-normal leading-[160%] self-stretch">
                        With two convenient Naperville locations, Brightside offers professional full-service washes, unlimited membership options, detailing services, and fleet solutions designed to keep vehicles looking their best. Our goal is simple: provide quality service, build lasting relationships, and become the car wash our community trusts most.
                    </p>
                </div>
            </div>
        </section>
    );
}