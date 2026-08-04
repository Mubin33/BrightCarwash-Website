'use client';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/contexts/ThemeContext';
import { LocationData } from '@/types/locations';

interface Props {
    location: LocationData;
}

export function LocationCard({ location }: Props) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div
            className={`flex p-6 sm:p-6 flex-col justify-center items-start gap-4 sm:gap-6 flex-1 rounded-lg ${isDark ? 'bg-white/12' : 'border-[#DFE1E7] bg-white'
                }`}
        >
            {/* Header */}
            <div className="flex justify-between items-center gap-3 self-stretch">
                <h3
                    className={`font-bebas text-2xl sm:text-3xl lg:text-4xl font-normal leading-[121%] ${isDark ? 'text-white' : 'text-[#1D1F2C]'
                        }`}
                >
                    {location.name}
                </h3>
                <a href={location.directionsUrl} target="_blank" rel="noopener noreferrer" className="sm:shrink-0">
                    <Button className="!py-2 sm:!py-2 px-4 sm:px-5 justify-center items-center gap-2 rounded-lg bg-[#0098E8] text-white font-inter text-xs sm:text-sm hover:bg-[#0079D4]">
                        <Icon name="book" width={24} height={24} color="white" />
                    </Button>
                </a>
            </div>

            {/* Map */}
            <div className="flex h-45 sm:h-55 lg:h-62.5 self-stretch rounded-lg border border-[#DFE1E7] relative overflow-hidden">
                <iframe
                    src={location.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <div className="flex items-start gap-2">
                    <Icon name="location" width={24} height={24} color="#0098E8" className="sm:w-5 sm:h-5" />
                    <span className={`font-inter text-sm sm:text-base ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                        {location.address}
                    </span>
                </div>
                <div className="flex items-start gap-2">
                    <Icon name="phone" width={24} height={24} color="#0098E8" className="sm:w-5 sm:h-5" />
                    <span className={`font-inter text-sm sm:text-base ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                        {location.phone}
                    </span>
                </div>
            </div>
        </div>
    );
}