'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinksProps {
  theme?: 'light' | 'dark';
}

export default function NavLinks({ theme = 'light' }: NavLinksProps) {
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'black' : 'white';
  const textColor = isDark ? 'white' : '#1e1e1e';
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <div className="relative" style={{ width: '33.29rem', height: '4.15rem', flexShrink: 1, minWidth: 0 }}>
      <div className="absolute top-0 left-0 w-full h-full rounded-[3px]" style={{ background: bgColor, transition: 'background-color 0.4s ease-in-out' }} />
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center gap-[10px]" style={{ width: '30.52rem', height: '2.56rem', top: '0.83rem', paddingLeft: '1.38rem', paddingRight: '1.38rem' }}>
        <Link 
          href="/work" 
          className="flex flex-col items-center justify-center shrink-0 text-center no-underline whitespace-nowrap" 
          style={{
            width: '4.36rem',
            fontSize: '0.97rem',
            fontFamily: 'var(--font-mono), "Courier New", Courier, monospace',
            fontWeight: '500',
            fontStyle: 'normal',
            fontSynthesis: 'none',
            lineHeight: '1',
            letterSpacing: '0',
            color: textColor,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            fontFeatureSettings: 'normal',
            textRendering: 'optimizeLegibility',
            transition: 'color 0.4s ease-in-out',
          }}
        >
          <span style={{ borderBottom: isActive('/work') ? '2px solid currentColor' : 'none' }}>WORK</span>
        </Link>
        <Link 
          href="/services" 
          className="flex flex-col items-center justify-center shrink-0 text-center no-underline whitespace-nowrap" 
          style={{
            width: '6.61rem',
            fontSize: '0.97rem',
            fontFamily: 'var(--font-mono), "Courier New", Courier, monospace',
            fontWeight: '500',
            fontStyle: 'normal',
            fontSynthesis: 'none',
            lineHeight: '1',
            letterSpacing: '0',
            color: textColor,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            fontFeatureSettings: 'normal',
            textRendering: 'optimizeLegibility',
            transition: 'color 0.4s ease-in-out',
          }}
        >
          <span style={{ borderBottom: isActive('/services') ? '2px solid currentColor' : 'none' }}>SERVICES</span>
        </Link>
        <Link 
          href="/about" 
          className="flex flex-col items-center justify-center shrink-0 text-center no-underline whitespace-nowrap" 
          style={{
            width: '4.91rem',
            fontSize: '0.97rem',
            fontFamily: 'var(--font-mono), "Courier New", Courier, monospace',
            fontWeight: '500',
            fontStyle: 'normal',
            fontSynthesis: 'none',
            lineHeight: '1',
            letterSpacing: '0',
            color: textColor,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            fontFeatureSettings: 'normal',
            textRendering: 'optimizeLegibility',
            transition: 'color 0.4s ease-in-out',
          }}
        >
          <span style={{ borderBottom: isActive('/about') ? '2px solid currentColor' : 'none' }}>ABOUT</span>
        </Link>
        <Link 
          href="/blog" 
          className="flex flex-col items-center justify-center shrink-0 text-center no-underline whitespace-nowrap" 
          style={{
            width: '4.89rem',
            fontSize: '0.97rem',
            fontFamily: 'var(--font-mono), "Courier New", Courier, monospace',
            fontWeight: '500',
            fontStyle: 'normal',
            fontSynthesis: 'none',
            lineHeight: '1',
            letterSpacing: '0',
            color: textColor,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            fontFeatureSettings: 'normal',
            textRendering: 'optimizeLegibility',
            transition: 'color 0.4s ease-in-out',
          }}
        >
          <span style={{ borderBottom: isActive('/blog') ? '2px solid currentColor' : 'none' }}>BLOG</span>
        </Link>
      </div>
    </div>
  );
}
