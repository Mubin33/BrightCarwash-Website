import Script from 'next/script';
import type { Metadata } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { BookingProvider } from '@/contexts/BookingContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ConditionalFaq } from '@/components/layout/ConditionalFaq';
import { ConditionalTrustedBy } from '@/components/layout/ConditionalTrustedBy';
import AiChatBot from '@/components/AiChatBot/AiChatBot';
import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: '%s | Brightside Car Wash',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'car wash Naperville',
    'detailing services Naperville',
    'Brightside Car Wash',
    'premium car wash',
    'membership car wash',
  ],
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 512,
        height: 512,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
      <body className={inter.className}>
        <Script
            id="theme-init"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                    (function() {
                      try {
                        var theme = localStorage.getItem('theme');
                        if (theme !== 'light' && theme !== 'dark') theme = 'light';
                        document.documentElement.setAttribute('data-theme', theme);
                      } catch (e) {}
                    })();
                `,
            }}
        />
        <ThemeProvider>
          <BookingProvider>
            <AiChatBot />
            <Navbar />
            {children}
            <ConditionalFaq />
            <ConditionalTrustedBy />
            <Footer />
          </BookingProvider>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </ThemeProvider>
      </body>
    </html>
  );
}