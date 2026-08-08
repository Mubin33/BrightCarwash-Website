import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BadgeCheck } from "lucide-react";
const data = [
  {
    icon: BadgeCheck,
    title: "UNLIMITED WASHES, FULL 90 DAYS",
    description:
      "Drive clean every day with our premium full-service membership plan.",
  },
  {
    icon: BadgeCheck,
    title: "LOCAL ROOTS, VETERAN PRIDE",
    description:
      "Proudly locally owned and operated by those who served our community.",
  },
  {
    icon: BadgeCheck,
    title: "COMMUNITY FIRST, ALWAYS PURPOSE-DRIVEN",
    description:
      "Every wash supports local causes and the people who make us stronger.",
  },
  {
    icon: BadgeCheck,
    title: "TWO LOCATIONS, ALWAYS NEAR YOU",
    description:
      "Visit either Naperville spot same great service, maximum convenience.",
  },
  {
    icon: BadgeCheck,
    title: "BUILT TO HONOR THOSE WHO SERVE",
    description:
      "Special support for military, veterans, first responders, healthcare, and educators.",
  },
  {
    icon: BadgeCheck,
    title: "NO CONTRACTS. NO SURPRISES EVER",
    description:
      "Flexible membership with zero auto-renewal—you stay fully in control.",
  },
];

export default function page() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Wash with a Purpose", href: "/wash-with-a-purpose" },
        ]}
      />
      <div className="py-10 lg:py-20 max-w-330 mx-auto">
        <SectionHeader
          badgeIcon="car"
          badgeText="Why It Matters"
          forceDark
          heading={
            <div className="w-full lg:w-2xl text-[#1d1f2c] dark:text-white lg:-ml-16">
              <span>Clean your car, strengthen</span>{" "}
              <span className="text-[#FEC300]">
                community <br /> ties{" "}
              </span>
              <span>and make a difference! </span>
            </div>
          }
          subheading="Every wash gives back. 20% of your purchase ($30 per pass) goes directly to the organization you love military groups, local schools, animal shelters, and first responders. No contracts. No auto-renewal. Just pure community impact."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-6 lg:mt-12">
          {data.map((item) => (
            <div
              className={`flex p-4 flex-col justify-center items-start gap-6 flex-1 rounded-lg border border-[#DFE1E7] bg-[#F8FAFB] dark:border-white/20 dark:bg-white/12`}
            >
              <div className="flex justify-between items-center self-stretch">
                <div
                  className={`flex p-2 items-center gap-3 rounded-lg border text-white border-[#E8E8E9] bg-[#B23730] dark:border-white/20 dark:bg-[#B23730]`}
                >
                  <item.icon />
                </div>
              </div>

              <h3
                className={`font-bebas self-stretch text-xl sm:text-2xl font-normal leading-[100%] dark:text-white`}
              >
                {item.title}
              </h3>

              <p
                className={`self-stretch font-inter text-sm sm:text-base font-normal leading-[160%] text-[#4A4C56] dark:text-white/80`}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
