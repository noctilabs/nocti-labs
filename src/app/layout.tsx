import type { Metadata } from 'next';
import './globals.css';
import { SanityLive } from '@/sanity/lib/live';
import NavWrapper from '@/components/layout/NavWrapper';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Nocti Labs - Commerce and Technology Studio for the AI era',
  description: 'We specialize in engineered commerce solutions for the next generation of digital businesses.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavWrapper />
        {children}
        <Footer />
        <SanityLive />
      </body>
    </html>
  );
}
