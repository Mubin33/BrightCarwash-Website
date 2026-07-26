'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'rect' | 'circle' | 'text';
    width?: string | number;
    height?: string | number;
    className?: string;
    isDark?: boolean;
}

export function Skeleton({
    variant = 'rect',
    width,
    height,
    className,
    isDark = false,
    ...props
}: SkeletonProps) {
    const baseClasses = 'animate-pulse';
    const colorClasses = isDark ? 'bg-[#2A2A2A]' : 'bg-gray-200';

    const variantClasses = {
        rect: 'rounded-lg',
        circle: 'rounded-full',
        text: 'rounded',
    };

    const style = {
        width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
        height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
    };

    return (
        <div
            className={cn(baseClasses, colorClasses, variantClasses[variant], className)}
            style={style}
            {...props}
        />
    );
}

export function SkeletonCard({ isDark = false }: { isDark?: boolean }) {
    return (
        <div className={`h-full flex flex-col items-start gap-4 self-stretch rounded-xl border ${isDark ? 'border-white/20 bg-white/[0.06]' : 'border-[#ECEFF3] bg-white'}`}>
            <Skeleton height={246} className="self-stretch rounded-t-xl" isDark={isDark} />
            <div className="flex flex-col items-start gap-3 p-4 pt-0 w-full">
                <div className="flex items-center gap-2 w-full">
                    <Skeleton width={80} height={16} isDark={isDark} />
                    <Skeleton width={96} height={16} isDark={isDark} />
                </div>
                <Skeleton width="100%" height={28} isDark={isDark} />
                <Skeleton width="100%" height={16} isDark={isDark} />
                <Skeleton width="75%" height={16} isDark={isDark} />
            </div>
        </div>
    );
}

export function SkeletonNewsDetail({ isDark = false }: { isDark?: boolean }) {
    return (
        <div className="flex flex-col items-start gap-8 self-stretch max-w-[1320px]">
            <Skeleton height={450} className="self-stretch rounded-lg" isDark={isDark} />
            <Skeleton width="75%" height={64} isDark={isDark} />
            <div className="flex items-center gap-2">
                <Skeleton width={80} height={16} isDark={isDark} />
                <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-[#2A2A2A]' : 'bg-gray-200'}`} />
                <Skeleton width={96} height={16} isDark={isDark} />
            </div>
            <div className="self-stretch flex flex-col gap-2">
                <Skeleton width="100%" height={16} isDark={isDark} />
                <Skeleton width="100%" height={16} isDark={isDark} />
                <Skeleton width="75%" height={16} isDark={isDark} />
                <Skeleton width="100%" height={16} isDark={isDark} />
                <Skeleton width="83%" height={16} isDark={isDark} />
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-6 self-stretch">
                <Skeleton height={450} className="flex-1 rounded-lg" isDark={isDark} />
                <Skeleton height={450} className="flex-1 rounded-lg" isDark={isDark} />
            </div>
            <div className="self-stretch flex flex-col gap-2">
                <Skeleton width="100%" height={16} isDark={isDark} />
                <Skeleton width="83%" height={16} isDark={isDark} />
                <Skeleton width="100%" height={16} isDark={isDark} />
                <Skeleton width="80%" height={16} isDark={isDark} />
                <Skeleton width="100%" height={16} isDark={isDark} />
            </div>
        </div>
    );
}

export function SkeletonGrid({
    count = 6,
    isDark = false,
    className = ""
}: {
    count?: number;
    isDark?: boolean;
    className?: string;
}) {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full ${className}`}>
            {[...Array(count)].map((_, i) => (
                <SkeletonCard key={i} isDark={isDark} />
            ))}
        </div>
    );
}

export function SkeletonGallery({ isDark = false }: { isDark?: boolean }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[1320px]">
            {[...Array(6)].map((_, i) => (
                <Skeleton
                    key={i}
                    height={500}
                    className="rounded-lg"
                    isDark={isDark}
                />
            ))}
        </div>
    );
}

export function SkeletonServices({ isDark = false }: { isDark?: boolean }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1280px] xl:max-w-[1320px]">
            {[...Array(6)].map((_, i) => (
                <Skeleton
                    key={i}
                    height={500}
                    className="rounded-lg"
                    isDark={isDark}
                />
            ))}
        </div>
    );
}