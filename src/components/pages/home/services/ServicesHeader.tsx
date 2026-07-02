import { SectionHeader } from '@/components/ui/SectionHeader';

export function ServicesHeader() {
    return (
        <SectionHeader
            badgeIcon="car"
            badgeText="Our Services"
            heading={
                <>
                    Everything your{' '}
                    <span className="text-[#B23730]">Car needs</span>{" "}
                    All in <span className="opacity-40">one place</span>
                </>
            }
            subheading="Hand-crafted care for your vehicle. Select any service below to add it to your booking — then pick your date and time."
        />
    );
}