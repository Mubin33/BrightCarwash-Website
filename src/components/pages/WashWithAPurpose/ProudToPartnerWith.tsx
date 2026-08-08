import { SectionHeader } from "@/components/ui/SectionHeader";

const data = [
  {
    image: "/images/wash-with-a-purpose.png",
    title: "WSFDV",
    description:
      "The West Suburban Foundation for Disabled Veterans is dedicated to supporting veterans with disabilities by providing essential resources and services. Our mission is to empower these brave individuals, helping them reintegrate into society and lead fulfilling lives.",
    link: "https://checkout.square.site/merchant/MLGKN6M92E8F6/checkout/2BPNVBSCHZSZDEJQ3U6HF2YZ",
  },
  {
    image: "/images/wash-with-a-purpose2.png",
    title: "Stillwater Starz",
    description:
      "The Stillwater Starz is a vibrant community of talented individuals who come together to showcase their skills and creativity. With a focus on collaboration and innovation, the Starz aim to inspire and uplift each other while making a positive impact in their surroundings.",
    link: "https://checkout.square.site/merchant/MLGKN6M92E8F6/checkout/2BPNVBSCHZSZDEJQ3U6HF2YZ",
  },
];

export default function ProudToPartnerWith() {
  return (
    <div className="bg-[#fff8ee] dark:bg-[#1a1a1a]">
      <div className="py-10 lg:py-20 max-w-330 mx-auto px-4 xl:px-0">
        <SectionHeader
          badgeIcon="car"
          badgeText="Proud to Partner With"
          forceDark
          heading={
            <>
              The organizations{" "}
              <span className="text-[#FEC300]">we proudly support</span> and
              uplift.
            </>
          }
          subheading="We are proud to partner with the following organizations to help us serve our community."
        />

        <div className="mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between bg-white dark:bg-[#403b35] border border-[#DFE1E7] dark:border-[#333] rounded-lg p-4 lg:p-6"
            >
              <div>
                <a href={item.link} target="_blank">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="mb-8 lg:mb-8 h-43"
                  />
                </a>

                <h3 className="text-2xl lg:text-[2rem] text-[#0098E8] font-semibold pb-4 mb-4 border-b border-[#DFE1E7] dark:border-white/50">
                  {item.title}
                </h3>

                <p className="text-sm lg:text-base text-[#4A4C56] dark:text-white/80">
                  {item.description}
                </p>
              </div>

              <a
                href={item.link}
                target="_blank"
                className="bg-[#FEC300] hover:bg-[#E6B800] text-black px-5 py-3.5 rounded-lg w-full text-sm lg:text-base font-medium uppercase leading-[124%] mt-6 lg:mt-8 cursor-pointer duration-300 text-center"
              >
                Support & Checkout
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
