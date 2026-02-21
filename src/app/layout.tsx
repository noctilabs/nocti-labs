import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
