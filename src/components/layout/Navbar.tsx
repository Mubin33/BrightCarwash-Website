'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { NavItems } from './navbar/NavItems';
import { ThemeToggle } from './navbar/ThemeToggle';
import { BookNowButton } from './navbar/BookNowButton';
import { CartButton } from './navbar/CartButton';
import { Icon } from '@/components/ui/Icon';

export function Navbar() {
    const { theme } = useTheme();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogoClick = (e: React.MouseEvent) => {
        if (pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <>
            <header
                className={`sticky top-0 flex w-full px-4 md:px-6 lg:px-8 xl:px-20 2xl:px-[300px] py-3 md:py-4 items-center gap-3 md:gap-4 z-50 border-b ${theme === 'dark'
                        ? 'border-white/20 bg-[#363636]/[0.12] backdrop-blur-md'
                        : 'border-[#DFE1E7] bg-white'
                    }`}
            >
                <div className="flex justify-between items-center flex-1 gap-4">
                    {/* Logo */}
                    <Link href="/" onClick={handleLogoClick} className="shrink-0">
                        <Image
                            src="/images/logo.png"
                            alt="Bright Carwash"
                            width={71}
                            height={80}
                            priority
                            className="w-10 h-auto sm:w-12 md:w-14 lg:w-[71px]"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:block">
                        <NavItems />
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <ThemeToggle />
                        <div className="hidden lg:block">
                            <BookNowButton />
                        </div>
                        <CartButton />

                        {/* Hamburger */}
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="lg:hidden flex p-2 items-center justify-center w-10 h-10 rounded-lg border border-[#DFE1E7] bg-white"
                        >
                            <Icon name="menu" width={20} height={20} color="#1B1B1B" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[100] lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    <div
                        className={`absolute top-0 right-0 h-full w-[300px] max-w-[80vw] shadow-xl transition-transform duration-300 flex flex-col p-6 gap-6 ${theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-white'
                            }`}
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-bebas-neue text-2xl text-[#1D1F2C] dark:text-white">Menu</span>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex p-2 items-center justify-center w-10 h-10 rounded-lg border border-[#DFE1E7] bg-white"
                            >
                                <Icon name="close" width={20} height={20} color="#1B1B1B" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-4">
                            <NavItems />
                        </div>
                        <div className="pt-4 border-t border-[#DFE1E7] dark:border-white/20">
                            <BookNowButton />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}