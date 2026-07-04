import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { footerData } from '@/data/footer';

export function Footer() {
    return (
        <footer className="font-bebas relative flex py-[86px] px-4 sm:px-8 lg:px-[300px] pb-10 flex-col justify-center items-center gap-5 overflow-hidden">
            <Image
                src="/images/Footer.png"
                alt="Footer background"
                fill
                className='object-cover z-0'
            />
            <div className="absolute inset-0 bg-[#092544]/90 z-[1]" />

            <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-[1320px] pb-12 justify-between items-start gap-10">
                {/* Brand */}
                <div className="flex flex-col items-start gap-5 max-w-[350px]">
                    <Image
                        src="/images/logo.png"
                        alt="Brightside Car Wash"
                        width={57}
                        height={64}
                        className="shrink-0"
                        style={{ aspectRatio: '57/64' }}
                    />
                    <p className="text-[#F7EBEA] font-inter text-lg font-normal leading-[160%]">
                        {footerData.description}
                    </p>
                </div>

                {/* Pages */}
                <div className="flex flex-col items-start gap-4">
                    <h4 className="text-white font-inter text-xl font-normal leading-[130%] tracking-[0.1px]">Pages</h4>
                    <div className="flex flex-col items-start gap-4">
                        {footerData.pages.map((page) => (
                            <Link key={page} href={page === 'Home' ? '/' : `/${page.toLowerCase().replace(/\s&\s/g, '-').replace(/\s/g, '-')}`} className="text-white/70 font-inter text-base font-normal leading-[100%] hover:text-white transition-colors">
                                {page}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Utility Pages */}
                <div className="flex flex-col items-start gap-4 w-[150px] shrink-0">
                    <h4 className="text-white font-inter text-xl font-normal leading-[130%] tracking-[0.1px]">Utility Pages</h4>
                    <div className="flex flex-col items-start gap-4">
                        {footerData.utilityPages.map((page) => (
                            <Link key={page} href={`/${page.toLowerCase().replace(/\s/g, '-')}`} className="text-white/70 font-inter text-base font-normal leading-[100%] hover:text-white transition-colors">
                                {page}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Contact */}
                <div className="flex flex-col items-start gap-4 w-[353px] shrink-0">
                    <h4 className="text-white font-inter text-xl font-normal leading-[130%] tracking-[0.1px]">Contact Us</h4>
                    <div className="flex flex-col items-start gap-3">
                        <div className="flex items-center gap-2">
                            <Icon name="email" width={16} height={16} color="#FFFFFF" />
                            <span className="text-white/70 font-inter text-base">{footerData.contact.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Icon name="phone" width={16} height={16} color="#FFFFFF" />
                            <span className="text-white/70 font-inter text-base">{footerData.contact.phone}</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-6 mt-2">
                        {footerData.socialLinks.map((social) => (
                            <Link key={social.name} href={social.href} aria-label={social.name}>
                                <Icon name={social.icon} width={20} height={20} color="#FFFFFF" className='p-2 bg-[#0098E8]/10 rounded-full' />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}