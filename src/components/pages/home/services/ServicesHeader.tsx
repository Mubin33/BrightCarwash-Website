import { SectionHeader } from "@/components/ui/SectionHeader";

export function ServicesHeader() {
  return (
    <SectionHeader
      badgeIcon="car"
      badgeText="Our Services"
      heading={
        <>
          Everything your Car needs
          <br />
          All in <span className="text-[#0098E8]">one place</span>
        </>
      }
      subheading={
        <>
          Hand-crafted care for your vehicle. Select any service below to
          <br />
          add it to your booking then pick your date and time.
        </>
      }
    />
  );
}
