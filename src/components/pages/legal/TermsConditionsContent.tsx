'use client';

import { Icon } from '@/components/ui/Icon';
import { ContrastIcon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const sections = [
    {
        title: '1. Services',
        content: 'We provide professional car wash and detailing services as described on our website. All services are subject to availability and may vary by location. We reserve the right to refuse service to any vehicle at our discretion.',
    },
    {
        title: '2. Bookings & Payments',
        content: 'Bookings are confirmed upon receipt of deposit payment. Prices are subject to change without notice. Cancellations made within 24 hours of the appointment may be subject to a cancellation fee. Deposits are non-refundable for no-shows.',
    },
    {
        title: '3. Vehicle Condition',
        content: 'We perform a pre-service inspection of your vehicle. While we take utmost care, Brightside Car Wash is not responsible for pre-existing damage, mechanical issues, or items left in the vehicle. Please remove all personal belongings before service.',
    },
    {
        title: '4. Satisfaction Guarantee',
        content: 'If you are not completely satisfied with our service, please notify us within 24 hours. We will re-clean any missed areas at no additional charge. This does not cover pre-existing conditions or damage.',
    },
    {
        title: '5. Liability',
        content: 'Our liability is limited to the cost of the service provided. We are not responsible for loss or damage caused by events beyond our control including, but not limited to, weather conditions, acts of third parties, or vehicle malfunctions.',
    },
    {
        title: '6. Contact',
        content: 'For any questions regarding these terms, please contact us at hello@brightsidecarwash.com or call (331) 401-5793.',
    },
];

export function TermsConditionsContent() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section
            className={`relative flex py-20 px-4 md:px-6 lg:px-10 flex-col items-center gap-8 overflow-hidden ${isDark ? 'bg-[#1A1A1A]' : 'bg-white'
                }`}
        >
            {/* Background Pattern – subdued for dark mode */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#0098E8] rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B23730] rounded-full blur-3xl" />
            </div>

            <div className="relative flex flex-col gap-8 w-full max-w-[900px]">
                {/* Header */}
                <div className="flex flex-col items-center gap-4 text-center">
                    <div
                        className={`flex items-center justify-center w-16 h-16 rounded-2xl ${isDark ? 'bg-white/10' : 'bg-[#EBF5FF]'
                            }`}
                    >
                        <ContrastIcon
                            width={28}
                            height={28}
                            color={isDark ? '#FEC300' : '#0098E8'}
                        />
                    </div>
                    <h1
                        className={`font-bebas text-4xl sm:text-5xl lg:text-6xl font-normal leading-[110%] tracking-[1px] ${isDark ? 'text-white' : 'text-[#1D1F2C]'
                            }`}
                    >
                        Terms & <span className="text-[#B23730]">Conditions</span>
                    </h1>
                    <p
                        className={`font-inter text-sm ${isDark ? 'text-white/50' : 'text-[#777980]'
                            }`}
                    >
                        Last updated: {new Date().getFullYear()}
                    </p>
                </div>

                {/* Intro */}
                <div
                    className={`p-6 sm:p-8 rounded-2xl border ${isDark
                            ? 'border-white/10 bg-white/[0.06]'
                            : 'border-[#DFE1E7] bg-[#F8FAFB]'
                        }`}
                >
                    <p
                        className={`font-inter text-base leading-[160%] ${isDark ? 'text-white/70' : 'text-[#4A4C56]'
                            }`}
                    >
                        Welcome to Brightside Car Wash. By accessing or using our services, you agree to be bound by these terms and conditions. Please read them carefully before booking.
                    </p>
                </div>

                {/* Sections */}
                <div className="flex flex-col gap-4">
                    {sections.map((section) => (
                        <div
                            key={section.title}
                            className={`p-6 sm:p-8 rounded-2xl border transition-shadow ${isDark
                                    ? 'border-white/10 bg-white/[0.04] hover:shadow-lg hover:shadow-white/5'
                                    : 'border-[#DFE1E7] bg-white hover:shadow-md'
                                }`}
                        >
                            <h2
                                className={`font-inter text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-[#1D1F2C]'
                                    }`}
                            >
                                {section.title}
                            </h2>
                            <p
                                className={`font-inter text-base leading-[160%] ${isDark ? 'text-white/60' : 'text-[#4A4C56]'
                                    }`}
                            >
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Contact Banner */}
                <div
                    className={`p-6 sm:p-8 rounded-2xl text-center ${isDark
                            ? 'bg-gradient-to-r from-[#0098E8]/80 to-[#0078D8]/80'
                            : 'bg-gradient-to-r from-[#0098E8] to-[#0078D8]'
                        }`}
                >
                    <h3 className="text-white font-inter text-xl font-semibold mb-2">
                        Have Questions?
                    </h3>
                    <p className="text-white/80 font-inter text-sm">
                        Reach out to us at{' '}
                        <a
                            href="mailto:hello@brightsidecarwash.com"
                            className="text-white underline font-medium"
                        >
                            hello@brightsidecarwash.com
                        </a>{' '}
                        or call{' '}
                        <a
                            href="tel:+13314015793"
                            className="text-white underline font-medium"
                        >
                            (331) 401-5793
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}