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
    <div className="relative" style={{ width: 'clamp(280px, 35.24vw, 481px)', height: 'clamp(36px, 4.4vw, 60px)', flexShrink: 1, minWidth: 0 }}>
      <div className="absolute top-0 left-0 w-full h-full rounded-[3px]" style={{ background: bgColor, transition: 'background-color 0.4s ease-in-out' }} />
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center gap-[10px]" style={{ width: 'clamp(260px, 32.31vw, 441px)', height: 'clamp(22px, 2.71vw, 37px)', top: 'clamp(7px, 0.88vw, 12px)', paddingLeft: 'clamp(12px, 1.47vw, 20px)', paddingRight: 'clamp(12px, 1.47vw, 20px)' }}>
        <Link 
          href="/work" 
          className="flex flex-col items-center justify-center shrink-0 text-center no-underline whitespace-nowrap" 
          style={{ 
            width: 'clamp(40px, 4.62vw, 63px)', 
            fontSize: 'clamp(10px, 1.03vw, 14px)', 
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
            width: 'clamp(60px, 6.99vw, 95.477px)', 
            fontSize: 'clamp(10px, 1.03vw, 14px)', 
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
            width: 'clamp(45px, 5.2vw, 71px)', 
            fontSize: 'clamp(10px, 1.03vw, 14px)', 
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
            width: 'clamp(40px, 5.18vw, 70.655px)', 
            fontSize: 'clamp(10px, 1.03vw, 14px)', 
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
