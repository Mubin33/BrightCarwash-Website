import { SectionHeader } from '@/components/ui/SectionHeader';
import { aboutData } from '@/data/about';

export function AboutHeading() {
    return (
        <SectionHeader
            badgeIcon="car"
            badgeText={aboutData.badgeText}
            heading={
                <>
                    <span>{aboutData.heading.prefix}{' '}</span>
                    <span className="text-[#B23730]">{aboutData.heading.accent}</span>{' '}
                    <span>{aboutData.heading.prefix2}{' '}</span>
                    <span className="text-[#A5A5AB]">{aboutData.heading.suffix}</span>
                </>
            }
            subheading=""
        />
    );
}