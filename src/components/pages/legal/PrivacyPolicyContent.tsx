'use client';

import { Icon } from '@/components/ui/Icon';
import { ContrastIcon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const sections = [
    {
        title: '1. Information We Collect',
        content: 'We collect information you provide directly when booking a service or submitting a quote request. This includes your name, email address, phone number, vehicle make and model, and payment details. We also automatically collect certain information when you visit our website, including your IP address and browsing behavior.',
    },
    {
        title: '2. How We Use Your Information',
        content: 'Your information is used to process and confirm bookings, communicate with you about your appointments, send promotional offers and updates (with your consent), improve our services and website experience, and comply with legal obligations.',
    },
    {
        title: '3. Payment Security',
        content: 'All payments are processed through secure, PCI-compliant payment processors including Square. We do not store your full credit card information on our servers. Your payment data is encrypted and transmitted securely.',
    },
    {
        title: '4. Cookies & Tracking',
        content: 'We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings.',
    },
    {
        title: '5. Third-Party Sharing',
        content: 'We do not sell, trade, or rent your personal information to third parties. We may share data with trusted service providers who assist us in operating our website and business, subject to strict confidentiality agreements.',
    },
    {
        title: '6. Your Rights',
        content: 'You have the right to access, update, or delete your personal information at any time. To exercise these rights or for privacy-related inquiries, please contact us using the information below.',
    },
    {
        title: '7. Contact Us',
        content: 'For privacy-related inquiries, contact us at hello@brightsidecarwash.com or call (331) 401-5793. You may also write to us at our Naperville, IL location.',
    },
];

export function PrivacyPolicyContent() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section
            className={`relative flex py-20 px-4 md:px-6 lg:px-10 flex-col items-center gap-8 overflow-hidden ${isDark ? 'bg-[#1A1A1A]' : 'bg-white'
                }`}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#0098E8] rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B23730] rounded-full blur-3xl" />
            </div>

            <div className="relative flex flex-col gap-8 w-full max-w-[900px]">
                {/* Header */}
                <div className="flex flex-col items-center gap-4 text-center">
                    <div
                        className={`flex items-center justify-center w-16 h-16 rounded-2xl ${isDark ? 'bg-white/10' : 'bg-[#F7EBEA]'
                            }`}
                    >
                        <ContrastIcon
                            width={28}
                            height={28}
                            color={isDark ? '#FEC300' : '#B23730'}
                        />
                    </div>
                    <h1
                        className={`font-bebas text-4xl sm:text-5xl lg:text-6xl font-normal leading-[110%] tracking-[1px] ${isDark ? 'text-white' : 'text-[#1D1F2C]'
                            }`}
                    >
                        Privacy <span className="text-[#0098E8]">Policy</span>
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
                        Brightside Car Wash (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
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

                {/* Security Banner */}
                <div
                    className={`p-6 sm:p-8 rounded-2xl text-center ${isDark
                            ? 'bg-gradient-to-r from-[#006F1F]/80 to-[#004D15]/80'
                            : 'bg-gradient-to-r from-[#006F1F] to-[#004D15]'
                        }`}
                >
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Icon name="contract" width={20} height={20} color="#FFFFFF" />
                        <h3 className="text-white font-inter text-xl font-semibold">
                            Your Data is Secure
                        </h3>
                    </div>
                    <p className="text-white/80 font-inter text-sm">
                        We use industry-standard encryption and security measures to protect your personal information.
                    </p>
                </div>
            </div>
        </section>
    );
}