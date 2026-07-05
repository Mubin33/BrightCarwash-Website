import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { MoveUpRight } from 'lucide-react';
import { membershipData } from '@/data/membership';

export function MembershipSectionWrapper() {
    return (
        <section className=" flex py-20 px-4 sm:px-8 lg:px-[300px] justify-center items-center gap-6 self-stretch bg-[#092544]">
            {/* Left Image */}
            <div className="hidden lg:flex w-[397px] self-stretch rounded-lg relative overflow-hidden shrink-0">
                <Image
                    src={membershipData.image}
                    alt="Heroes Membership"
                    fill
                    className="object-cover"
                    sizes="397px"
                    style={{ aspectRatio: '78/53' }}
                />
            </div>

            {/* Right Content */}
            <div className="flex flex-col items-start gap-4 flex-1">
                {/* Badge */}
                <div className="font-bebas flex py-[6px] px-3 items-center gap-2 rounded-lg border border-white/20 bg-white/[0.12]">
                    <Icon name={membershipData.badgeIcon} width={16} height={16} color="#FFFFFF" />
                    <span className="text-white font-inter text-sm font-normal leading-[112%]">
                        {membershipData.badgeText}
                    </span>
                </div>

                {/* Heading */}
                <h2 className="text-[#FEC300] font-bebas! text-4xl lg:text-5xl font-normal leading-[100%]">
                    {membershipData.heading}
                </h2>

                {/* Description */}
                <p className="self-stretch text-white/80 font-inter text-base lg:text-lg font-normal leading-[160%]">
                    {membershipData.description}
                </p>

                {/* Button */}
                <Button className="font-bebas flex py-[14px] px-5 justify-center items-center gap-2 rounded-lg bg-white text-[#B23730]! text-lg! hover:bg-gray-100 mt-8">
                    {membershipData.buttonText}
                    <MoveUpRight size={16} />
                </Button>
            </div>
        </section>
    );
}