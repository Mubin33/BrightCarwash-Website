import { Icon } from '@/components/ui/Icon';
import { useTheme } from '@/contexts/ThemeContext';

interface Props {
    icon: string;
    title: string;
    description: string;
}

export default function FeatureCard({ icon, title, description }: Props) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className={`flex p-4 flex-col justify-center items-start gap-6 self-stretch rounded-lg border ${isDark ? 'border-white/20 bg-white/[0.06]' : 'border-[#DFE1E7] bg-[#F8FAFB]'}`}>
            <div className={`flex p-2 items-center gap-3 rounded-lg border ${isDark ? 'border-white/20 bg-white/[0.08]' : 'border-[#E8E8E9] bg-white'}`}>
                <Icon name={icon} width={24} height={24} color={isDark ? '#0098E8' : '#B23730'} />
            </div>
            <div className="flex flex-col items-start gap-4 self-stretch">
                <span className={`self-stretch font-bebas-neue text-2xl font-normal leading-[100%] ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                    {title}
                </span>
                <p className={`self-stretch font-inter text-base font-normal leading-[160%] ${isDark ? 'text-white/70' : 'text-[#4A4C56]'}`}>
                    {description}
                </p>
            </div>
        </div>
    );
}