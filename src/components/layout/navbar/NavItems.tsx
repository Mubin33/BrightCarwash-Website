'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Services', href: '/services' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'News & Events', href: '/news' },
    { label: 'Store', href: 'https://brightsidecw.qbstores.com/' },
];

export function NavItems() {
    const pathname = usePathname();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <nav className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-5 xl:gap-8">
            {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`font-inter text-base font-normal leading-[100%] transition-colors whitespace-nowrap ${isActive
                            ? `underline decoration-[#B23730] decoration-[11%] underline-offset-[25%] ${isDark ? 'text-white' : 'lg:text-white text-[#092544]'}`
                            : `no-underline ${isDark ? 'text-[#E9E9EA]' : 'lg:text-white text-[#4A4C56]'}`
                            }`}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
}