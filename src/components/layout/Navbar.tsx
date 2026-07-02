'use client';

import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { NavItems } from './navbar/NavItems';
import { ThemeToggle } from './navbar/ThemeToggle';
import { BookNowButton } from './navbar/BookNowButton';
import { CartButton } from './navbar/CartButton';

export function Navbar() {
    const { theme } = useTheme();

    return (
        <header
            className={`flex w-full px-[300px] py-4 items-center gap-4 absolute top-0 left-0 z-50 border-b ${theme === 'dark'
                ? 'border-white/20 bg-[#363636]/[0.12] backdrop-blur-md'
                : 'border-[#DFE1E7] bg-white'
                }`}
        >
            <div className="flex justify-between items-center flex-1">
                {/* Logo */}
                <Image
                    src="/images/logo.png"
                    alt="Bright Carwash"
                    width={71}
                    height={80}
                    priority
                    className="shrink-0"
                />

                {/* Navigation */}
                <NavItems />

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <BookNowButton />
                    <CartButton />
                </div>
            </div>
        </header>
    );
}