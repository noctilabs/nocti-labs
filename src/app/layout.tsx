import type { Metadata } from 'next';
import './globals.css';
import { SanityLive } from '@/sanity/lib/live';
import PersistentNav from '@/components/layout/PersistentNav';

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
        <PersistentNav />
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
