import type { Metadata } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';
import './globals.css';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { FaqSection } from '@/components/pages/home/all-sections/FaqSection';
import { BookingProvider } from '@/contexts/BookingContext';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
});

export const metadata: Metadata = {
  title: 'Bright Carwash',
  description: 'Premium Car Wash & Detailing Services',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <BookingProvider>
            <Navbar />
            {children}
            <FaqSection />
            <Footer />
          </BookingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}