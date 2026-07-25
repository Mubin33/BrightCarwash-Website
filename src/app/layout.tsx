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
import { TrustedBy } from '@/components/pages/home/TrustedBy/TrustedBy';
import { ConditionalTrustedBy } from '@/components/layout/ConditionalTrustedBy';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
});

export const metadata: Metadata = {
  title: 'Brightside Car Wash',
  description: 'Premium Car Wash & Detailing Services in Naperville. Veteran-owned, family-operated. Book online in 60 seconds.',
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: 'Brightside Car Wash',
    description: 'Premium Car Wash & Detailing Services in Naperville. Veteran-owned, family-operated. Book online in 60 seconds.',
    images: [
      {
        url: '/images/logo.png',
        width: 512,
        height: 512,
        alt: 'Brightside Car Wash',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <BookingProvider>
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