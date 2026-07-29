import { SectionHeader } from "@/components/ui/SectionHeader";
import Image from "next/image";
import CarIcon from "../../../../../public/icons/custom/CarIcon";
import StarIcon from "../../../../../public/icons/custom/StarIcon";
import { Icon } from "@/components/ui/Icon";
import BatchIcon from "../../../../../public/icons/custom/BatchIcon";

export function AboutSectionWrapper() {
  const data = [
    {
      icon: <CarIcon />,
      title: "12,000+",
      subtitle: "Cars Washed",
    },
    {
      icon: <StarIcon />,
      title: "4.9",
      subtitle: "Average rating",
    },
    {
      icon: <CarIcon />,
      title: "95%",
      subtitle: "Customer satisfaction",
    },
    {
      icon: <StarIcon />,
      title: "500+",
      subtitle: "Repeat customers",
    },
  ];
  return (
    <section className="bg-[#092544] py-10 xl:py-20 px-4 sm:px-6 lg:px-10">
      <div className="max-w-330 mx-auto flex flex-col lg:flex-row gap-6 xl:gap-12">
        <div className="w-full lg:w-120 shrink-0 relative h-100 lg:h-164 p-4">
          <Image
            src="/images/CEO-image.png"
            alt="Brightside car wash service"
            fill
            className="object-cover rounded-xl"
          />

          <div className=" absolute bottom-4 left-4 right-4 flex flex-col items-center justify-center bg-[#092544] border-b-3  border-l-3 border-t border-r border-[#FEC300] rounded-lg p-3 sm:p-6">
            <div className="flex justify-between items-center sm:gap-4 w-full">
              <div>
                <h1 className="text-xl lg:text-[1.7rem] uppercase font-bebas text-white tracking-[0.64px]">
                  Jonathan Roldan
                </h1>
                <p className="text-xs lg:text-sm text-[#FEC300]">
                  Founder & Naperville Resident
                </p>
              </div>
              <p className="text-[0.5rem] sm:text-xs px-3 py-1.5 text-white font-semibold bg-[#B23730] uppercase rounded-full leading-[112%] tracking-[0.5px] sm:tracking-[2px]">
                US. ARMY veteran
              </p>
            </div>
          </div>
          <div className="h-14 w-14 flex items-center justify-center absolute -top-4 -left-4 sm:-top-6 sm:-left-6 bg-[#FEC300] rounded-full border-4 border-[#092544]">
            <BatchIcon />
          </div>
        </div>
        <div className="lg:w-full xl:w-full">
          <div>
            <div className="w-fit flex flex-wrap py-1.5 px-3 mb-4 items-center gap-2 sm:gap-3 rounded-lg border text-white border-[#DCA3A0] bg-[#B23730]">
              <Icon
                name="car"
                width={20}
                height={20}
                color="#fff"
                className="sm:w-4 sm:h-4"
              />
              <span className="w-fit font-inter text-[10px] xs:text-xs sm:text-sm font-normal leading-[112%] uppercase">
                THE FOUNDER'S STORY
              </span>
            </div>
            <h1 className="font-bebas text-3xl sm:text-4xl lg:text-5xl font-normal leading-[116%] text-white mb-4">
              BUILT ON INTEGRITY, <br className="hidden lg:block" /> DISCIPLINE
              & SERVICE.
            </h1>
            <p className="text-white/80 font-inter text-sm xl:text-lg dark:text-white/80 font-normal leading-[160%] self-stretch">
              At Brightside Car Wash, we're more than just a car wash we're a
              locally owned, community-focused business committed to providing
              exceptional full-service car care in Naperville. As a
              veteran-owned and family-operated company, we take pride in
              delivering outstanding service, treating every customer with
              respect, and creating a welcoming experience for families,
              commuters, and businesses alike. <br /> <br /> With two convenient
              Naperville locations, Brightside offers professional full-service
              washes, unlimited membership options, detailing services, and
              fleet solutions designed to keep vehicles looking their best. Our
              goal is simple: provide quality service, build lasting
              relationships, and become the car wash our community trusts most.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-2 xl:gap-3">
            {data.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center gap-3 bg-[#252019] rounded-xl py-5 px-4"
              >
                {item.icon}
                <h2 className="text-xl lg:text-2xl  xl:text-[2rem] font-bebas text-white">
                  {item.title}
                </h2>
                <p className="text-[10px] xl:text-sm text-white/80 text-center">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
