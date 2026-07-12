"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { footerData } from '@/data/footer';
import { usePathname } from 'next/navigation';

export function Footer() {

    const pathname = usePathname();

    const handleLogoClick = (e: React.MouseEvent) => {
        if (pathname === '/') {
            e.preventDefault();
            const hero = document.getElementById('hero');
            if (hero) {
                hero.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };
    const getPageHref = (page: string) => {
        if (page === 'Home') return '/';
        if (page === 'News & Events') return '/news';
        return `/${page.toLowerCase().replace(/\s/g, '-')}`;
    };
    return (
        <footer className="relative flex py-16 sm:py-20 lg:py-[86px] px-4 md:px-6 lg:px-10 pb-10 flex-col justify-center items-center gap-5 overflow-hidden">
            <Image
                src="/images/footer.jpg"
                alt="Footer background"
                fill
                className="object-cover z-0"
            />
            <div className="absolute inset-0 bg-[#092544]/80 z-[1]" />

            <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-8 sm:gap-10 w-full max-w-[1280px] xl:max-w-[1320px] 2xl:max-w-[1600px] pb-12">
                {/* Brand */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left lg:max-w-[40%]">
                    <Link href="/#hero" onClick={handleLogoClick} className="w-32 h-[150px] sm:w-32 sm:h-[150px] relative shrink-0 cursor-pointer">
                        <Image
                            src="/images/logo.png"
                            alt="Brightside Car Wash"
                            fill
                            className="object-contain"
                        />
                    </Link>
                    <p className="text-[#F7EBEA] font-inter text-sm sm:text-base lg:text-lg font-normal leading-[160%]">
                        {footerData.description}
                    </p>
                </div>

                {/* Pages + Legal + Contact */}
                <div className="flex flex-wrap justify-between gap-8 sm:gap-10 lg:max-w-[55%] w-full">
                    {/* Pages */}
                    <div className="flex flex-col items-start gap-3 sm:gap-4">
                        <h4 className="text-white font-inter text-base sm:text-lg lg:text-xl font-normal leading-[130%] tracking-[0.1px]">Pages</h4>
                        <div className="flex flex-col items-start gap-2 sm:gap-3">
                            {footerData.pages.map((page) => (
                                <Link
                                    key={page}
                                    href={getPageHref(page)}
                                    className="text-white/70 font-inter text-xs sm:text-sm lg:text-base font-normal leading-[100%] hover:text-white transition-colors whitespace-nowrap p-1"
                                >
                                    {page}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Legal */}
                    <div className="flex flex-col items-start gap-3 sm:gap-4">
                        <h4 className="text-white font-inter text-base sm:text-lg lg:text-xl font-normal leading-[130%] tracking-[0.1px]">Legal</h4>
                        <div className="flex flex-col items-start gap-2 sm:gap-3">
                            <Link href="/terms" className="text-white/70 font-inter text-xs sm:text-sm lg:text-base font-normal leading-[100%] hover:text-white transition-colors whitespace-nowrap p-1">
                                Terms & Conditions
                            </Link>
                            <Link href="/privacy" className="text-white/70 font-inter text-xs sm:text-sm lg:text-base font-normal leading-[100%] hover:text-white transition-colors whitespace-nowrap p-1">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col items-start gap-3 sm:gap-4">
                        <h4 className="text-white font-inter text-base sm:text-lg lg:text-xl font-normal leading-[130%] tracking-[0.1px]">Contact Us</h4>
                        <div className="flex flex-col items-start gap-2 sm:gap-3">
                            <div className="flex items-center gap-2">
                                <Icon name="email" width={14} height={14} color="#FFFFFF" className="sm:w-4 sm:h-4" />
                                <span className="text-white/70 font-inter text-xs sm:text-sm lg:text-base">{footerData.contact.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Icon name="phone" width={14} height={14} color="#FFFFFF" className="sm:w-4 sm:h-4" />
                                <span className="text-white/70 font-inter text-xs sm:text-sm lg:text-base">{footerData.contact.phone}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4 mt-1 sm:mt-2">
                            {footerData.socialLinks.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.name}
                                    className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-[#0098E8]/30 transition-colors"
                                >
                                    <Icon name={social.icon} width={24} height={24} color="#FFFFFF" className="sm:w-[18px] sm:h-[18px]" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}