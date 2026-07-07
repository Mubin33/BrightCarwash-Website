'use client';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/contexts/ThemeContext';
interface LocationData {
    name: string;
    address: string;
    phone: string;
    mapImage: string;
    mapEmbedUrl: string;
    directionsUrl: string;
}
interface Props {
    location: LocationData;
}
export function LocationCard({ location }: Props) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    return (
        <div
            className={`flex p-4 sm:p-6 flex-col justify-center items-start gap-4 sm:gap-6 flex-1 rounded-lg border ${isDark ? 'border-white/20 bg-white/[0.12]' : 'border-[#DFE1E7] bg-white'
                }`}
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 self-stretch">
                <h3 className={`font-bebas text-2xl sm:text-3xl lg:text-4xl font-normal leading-[121%] ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                    {location.name}
                </h3>
                <a href={location.directionsUrl} target="_blank" rel="noopener noreferrer" className="sm:shrink-0">
                    <Button className="flex py-2.5 sm:py-3 px-4 sm:px-5 justify-center items-center gap-2 rounded-lg bg-[#B23730] text-white font-inter text-xs sm:text-sm hover:bg-[#9A2E28]">
                        Get Directions
                        <Icon name="book" width={16} height={16} color="white" />
                    </Button>
                </a>
            </div>
            {/* Map */}
            <div className="flex h-[180px] sm:h-[220px] lg:h-[250px] self-stretch rounded-lg border border-[#DFE1E7] relative overflow-hidden">
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
                    <Icon name="location" width={18} height={18} color="#0098E8" className="sm:w-5 sm:h-5" />
                    <span className={`font-inter text-sm sm:text-base ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                        {location.address}
                    </span>
                </div>
                <div className="flex items-start gap-2">
                    <Icon name="phone" width={18} height={18} color="#0098E8" className="sm:w-5 sm:h-5" />
                    <span className={`font-inter text-sm sm:text-base ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                        {location.phone}
                    </span>
                </div>
            </div>
        </div>
    );
}