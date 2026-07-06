'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Service', href: '/services' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'News & Events', href: '/news' },
    { label: 'Store', href: 'https://brightsidecw.qbstores.com/' },

];

export function NavItems() {
    const pathname = usePathname();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <nav className="flex items-center gap-8">
            {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`font-inter text-base font-normal leading-[100%] transition-colors ${isActive
                            ? 'underline decoration-[#B23730] decoration-[11%] underline-offset-[25%]'
                            : 'no-underline'
                            } ${isActive
                                ? isDark
                                    ? 'text-white'
                                    : 'text-[#1D1F2C]'
                                : isDark
                                    ? 'text-white/80'
                                    : 'text-[#777980]'
                            }`}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
}