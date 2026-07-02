import Image from 'next/image';

interface IconProps {
    name: string;
    width?: number;
    height?: number;
    color?: string;
    className?: string;
}

const COLOR_FILTERS: Record<string, string> = {
    '#B23730': 'brightness(0) saturate(100%) invert(17%) sepia(88%) saturate(2397%) hue-rotate(349deg) brightness(93%) contrast(89%)',
    '#0098E8': 'brightness(0) saturate(100%) invert(56%) sepia(82%) saturate(2365%) hue-rotate(179deg) brightness(97%) contrast(93%)',
    '#FFFFFF': 'brightness(0) saturate(100%) invert(100%)',
    '#FEC300': 'brightness(0) saturate(100%) invert(78%) sepia(62%) saturate(1667%) hue-rotate(358deg) brightness(103%) contrast(105%)',
};

export function Icon({ name, width = 24, height = 24, color, className = '' }: IconProps) {
    return (
        <span
            className={`shrink-0 inline-flex ${className}`}
            style={color ? { filter: COLOR_FILTERS[color] || 'none' } : undefined}
        >
            <Image
                src={`/icons/svgs/${name}.svg`}
                alt={`${name} icon`}
                width={width}
                height={height}
            />
        </span>
    );
}