'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';

export function BookNowButton() {
    const pathname = usePathname();

    // Hide on booking-related pages
    if (pathname.startsWith('/booking')) return null;

    const handleClick = (e: React.MouseEvent) => {
        if (pathname === '/') {
            e.preventDefault();
            const section = document.getElementById('services');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.location.href = '/services';
            }
        }
    };

    const isHome = pathname === '/';

    return (
        <Link
            href={isHome ? '#services' : '/services'}
            onClick={isHome ? handleClick : undefined}
            className="flex py-[14px] px-5 justify-center items-center gap-2 rounded-lg bg-[#0098E8] text-white font-inter text-sm font-medium hover:bg-[#0088D8] transition-colors"
        >
            Book Now
            <Icon name="book" width={20} height={20} />
        </Link>
    );
}