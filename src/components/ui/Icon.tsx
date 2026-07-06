import Image from 'next/image';

interface IconProps {
    name: string;
    width?: number;
    height?: number;
    color?: string;
    className?: string;
}

export function Icon({ name, width = 24, height = 24, color, className = '' }: IconProps) {
    if (color) {
        return (
            <span
                className={`shrink-0 inline-block ${className}`}
                style={{
                    width,
                    height,
                    backgroundColor: color,
                    WebkitMaskImage: `url(/icons/svgs/${name}.svg)`,
                    maskImage: `url(/icons/svgs/${name}.svg)`,
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                }}
            />
        );
    }

    return (
        <span className={`shrink-0 inline-flex ${className}`}>
            <Image
                src={`/icons/svgs/${name}.svg`}
                alt={`${name} icon`}
                width={width}
                height={height}
            />
        </span>
    );
}