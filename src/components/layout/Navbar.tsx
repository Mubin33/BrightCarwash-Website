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
            className={`flex w-full px-4 sm:px-6 md:px-10 lg:px-[300px] py-4 items-center gap-4 absolute top-0 left-0 z-50 border-b ${theme === 'dark'
                ? 'border-white/20 bg-[#363636]/[0.12] backdrop-blur-md'
                : 'border-[#DFE1E7] bg-white'
                }`}
        >
            <div className="flex justify-between items-center flex-1 gap-4">
                {/* Logo */}
                <Image
                    src="/images/logo.png"
                    alt="Bright Carwash"
                    width={71}
                    height={80}
                    priority
                    className="shrink-0 w-12 h-auto sm:w-14 lg:w-[71px]"
                />

                {/* Navigation */}
                <div className="hidden lg:block">
                    <NavItems />
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                    <ThemeToggle />
                    <div className="hidden lg:block">
                        <BookNowButton />
                    </div>
                    <CartButton />
                </div>
            </div>
        </header>
    );
}