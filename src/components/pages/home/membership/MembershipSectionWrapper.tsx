import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { membershipData } from '@/data/membership';

export function MembershipSectionWrapper() {
    return (
        <section className="flex py-16 sm:py-20 px-4 md:px-6 lg:px-10 justify-center items-center gap-6 self-stretch bg-[#092544]">
            <div className="flex flex-col lg:flex-row items-center gap-6 w-full max-w-[1280px] xl:max-w-[1320px]">
                {/* Left Image */}
                <div className="hidden lg:flex w-[300px] xl:w-[397px] self-stretch rounded-lg relative overflow-hidden shrink-0">
                    <Image
                        src={membershipData.image}
                        alt="Heroes Membership"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1280px) 300px, 397px"
                        style={{ aspectRatio: '78/53' }}
                    />
                </div>

                {/* Right Content */}
                <div className="flex flex-col items-start gap-4 flex-1">
                    {/* Badge */}
                    <div className="flex py-[6px] px-3 items-center gap-2 rounded-lg border border-white/20 bg-white/[0.12]">
                        <Icon name={membershipData.badgeIcon} width={16} height={16} color="#FFFFFF" />
                        <span className="text-white font-inter text-sm font-normal leading-[112%]">
                            {membershipData.badgeText}
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-[#FEC300] font-bebas text-4xl lg:text-5xl font-normal leading-[100%]">
                        {membershipData.heading}
                    </h2>

                    {/* Description */}
                    <p className="self-stretch text-white/80 font-inter text-base lg:text-lg font-normal leading-[160%]">
                        {membershipData.description}
                    </p>

                    {/* Button */}
                    {/* <Button className="flex py-[14px] px-5 justify-center items-center gap-2 rounded-lg bg-white text-[#B23730]! text-lg hover:bg-gray-100 mt-8">
                        {membershipData.buttonText}
                        <Icon name="book" width={20} height={20} color="#B23730" />
                    </Button> */}
                </div>
            </div>
        </section>
    );
}