import { SectionHeader } from "@/components/ui/SectionHeader";
import Image from "next/image";
import CarIcon from "../../../../../public/icons/custom/CarIcon";
import StarIcon from "../../../../../public/icons/custom/StarIcon";

export function AboutSectionWrapper() {
  const data = [
    {
      icon: <CarIcon />,
      title: "12,000+",
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
    <section className="bg-[#092544] py-20">
      <div className="max-w-350 mx-auto flex gap-12">
        <Image
          src="/images/CEO-image.png"
          alt="Brightside car wash service"
          height={656}
          width={500}
          className="w-125 object-cover rounded-xl"
        />
        <div>
          <div>
            <h1 className="font-bebas text-3xl sm:text-4xl lg:text-5xl font-normal leading-[116%] text-white mb-4">
              BUILT ON INTEGRITY, <br /> DISCIPLINE & SERVICE.
            </h1>
            <p className="text-white/80 font-inter text-sm sm:text-lg dark:text-white/80 font-normal leading-[160%] self-stretch">
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
          <div className="mt-8 grid grid-cols-4 gap-3">
            {data.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center gap-3 bg-[#252019] rounded-xl py-5 px-4"
              >
                {item.icon}
                <h2 className="text-[2rem] font-bebas text-white">
                  {item.title}
                </h2>
                <p className="text-sm text-white/80">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

//  <section className="flex py-20 px-4 md:px-6 lg:px-10 flex-col justify-center items-center gap-12 self-stretch bg-[#092544]">
//             <div className="flex flex-col lg:flex-row items-start gap-6 w-full max-w-[1280px] xl:max-w-[1320px] 2xl:max-w-[1600px]">
//                 {/* Left Content */}
//                 <div className="flex w-full lg:w-162 flex-col items-start gap-6 self-stretch">
//                     <SectionHeader
//                         badgeIcon="car"
//                         badgeText={aboutData.badgeText}
//                         align="start"
//                         heading={
//                             <>
//                                 <span className="text-[#FFFFFF]">{aboutData.heading.prefix} </span>
//                                 <span className="text-[#B23730]">{aboutData.heading.accent}</span>{' '}
//                                 <span className="text-[#FFFFFF]">{aboutData.heading.prefix2} </span>
//                                 <span className="text-[#A5A5AB]">{aboutData.heading.suffix}</span>
//                             </>
//                         }
//                         subheading=""
//                     />

//                     {aboutData.paragraphs.map((text, i) => (
//                         <p
//                             key={i}
//                             className="text-white/80 font-inter text-sm sm:text-base font-normal leading-[160%] self-stretch"
//                         >
//                             {text}
//                         </p>
//                     ))}

//                     <div className="flex p-4 flex-col justify-end items-center gap-2.5 flex-1 self-stretch rounded-lg relative overflow-hidden min-h-62.5 sm:min-h-75">
//                         <Image
//                             src="/images/about-us-service-image.jpg"
//                             alt="Brightside car wash service"
//                             fill
//                             className="object-cover"
//                             sizes="(max-width: 1024px) 100vw, 648px"
//                         />
//                     </div>
//                 </div>

//                 {/* Right Content */}
//                 <div className="flex w-full lg:flex-1 flex-col justify-between! items-start gap-6 self-stretch">
//                     <div className="flex h-60 sm:h-80 lg:h-137 p-4 flex-col justify-end items-start gap-2.5 self-stretch rounded-lg relative overflow-hidden">
//                         <Image
//                             src="/images/CEO-image.png"
//                             alt="Jonathan Roldan - Founder"
//                             fill
//                             className="object-fit"
//                             sizes="(max-width: 1024px) 100vw, 50vw"
//                         />
//                     </div>
//                     <FounderCard />
//                 </div>
//             </div>
//         </section>
