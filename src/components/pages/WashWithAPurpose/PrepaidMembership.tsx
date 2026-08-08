import Image from "next/image";
import CarIcon2 from "../../../../public/icons/custom/CarIcon2";
import CheckIcon2 from "../../../../public/icons/custom/CheckIcon2";

export default function PrepaidMembership() {
  return (
    <div className="bg-[#092544]">
      <div className="py-10 lg:py-20 max-w-330 mx-auto px-4 xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Image
              width={500}
              height={500}
              src="/images/wash-with-a-purpose3.png"
              alt=""
              className="w-full h-full rounded-lg object-cover object-center"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <div
                className={`w-fit flex py-1.5 px-3 items-center gap-3 rounded-lg border border-[#E7C1BF] bg-[#B23730]`}
              >
                <CarIcon2 />
                <span className="font-inter text-sm font-normal leading-[112%] text-white">
                  90-Day Prepaid Membership
                </span>
              </div>
              <div>
                <p className="uppercase font-bebas text-[#FEC300] text-2xl">
                  <span className="text-[4rem] text-white">$150 </span>/ 90 Full
                  Days
                </p>
                <p className="text-[#d5d5d5] text-sm lg:text-base font-normal leading-[160%]">
                  One-time payment • Absolutely NO auto-renewal • No
                  subscription lock-in
                </p>
                <ul className="mt-4 space-y-4">
                  <li className="flex items-start gap-4 text-sm lg:text-base text-[#d5d5d5] leading-[160%]">
                    <span>
                      <CheckIcon2 />
                    </span>
                    Unlimited Better Full-Service Washes for 90 days
                  </li>
                  <li className="flex items-start gap-4 text-sm lg:text-base text-[#d5d5d5] leading-[160%]">
                    <span>
                      <CheckIcon2 />
                    </span>
                    Valid at Both Naperville Locations (North & South Tunnels)
                  </li>
                  <li className="flex items-start gap-4 text-sm lg:text-base text-[#d5d5d5] leading-[160%]">
                    <span>
                      <CheckIcon2 />
                    </span>
                    20% ($30.00) Direct Giveback to West Suburban Foundation for
                    Disabled Veterans
                  </li>
                  <li className="flex items-start gap-4 text-sm lg:text-base text-[#d5d5d5] leading-[160%]">
                    <span>
                      <CheckIcon2 />
                    </span>
                    Automatic Optical License Plate Recognition (Express
                    Drive-Through)
                  </li>
                  <li className="flex items-start gap-4 text-sm lg:text-base text-[#d5d5d5] leading-[160%]">
                    <span>
                      <CheckIcon2 />
                    </span>
                    Includes Ceramic Paint Shield, Tire Shine, Underbody &
                    Self-Service Vacuums
                  </li>
                  <li className="flex items-start gap-4 text-sm lg:text-base text-[#d5d5d5] leading-[160%]">
                    <span>
                      <CheckIcon2 />
                    </span>
                    No Contracts - Cancel or Renew Whenever You Want
                  </li>
                </ul>
              </div>
            </div>
            <button className="w-full lg:w-fit bg-[#FEC300] hover:bg-[#E6B800] text-black px-5 py-3.5 rounded-lg text-sm lg:text-base font-medium uppercase leading-[124%] mt-6 lg:mt-8 cursor-pointer duration-300 text-center">
              Purchase & Checkout
            </button>
          </div>
        </div>
        <p className="border border-[#8AD0F4] rounded-lg text-[#0098E8] bg-[rgba(0,152,232,0.12)] text-xs lg:text-sm p-3 lg:p-4 mt-4 lg:mt-6">
          You'll be taken to our secure Square checkout to complete your
          purchase. We'll collect your name, email, phone, and license plate,
          and you'll be asked to name the organization you're supporting
          (required) so we can set up your membership and direct your 20%
          give-back.
        </p>
      </div>
    </div>
  );
}
