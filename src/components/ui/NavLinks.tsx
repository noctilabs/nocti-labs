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
    <div className="relative" style={{ width: 'clamp(280px, 32vw, 601.25px)', height: 'clamp(36px, 4vw, 75px)' }}>
      <div className="absolute top-0 left-0 w-full h-full rounded-[3px]" style={{ background: bgColor, transition: 'background-color 0.4s ease-in-out' }} />
      <div className="absolute left-1/2 -translate-x-1/2 w-[91.5%] flex items-center justify-center gap-[10px] px-[25px]" style={{ top: 'clamp(6px, 0.8vw, 15px)', height: 'clamp(24px, 2.4vw, 46.25px)' }}>
        <Link href="/work"     className="flex flex-col items-center justify-center shrink-0 text-center font-semibold font-['ABC_Diatype_Mono_Unlicensed_Trial'] leading-tight no-underline whitespace-nowrap" style={{ width: 'clamp(40px, 4.5vw, 78.75px)', fontSize: 'clamp(10px, 1vw, 17.5px)', color: textColor, transition: 'color 0.4s ease-in-out', minHeight: 'clamp(10px, 1vw, 17.5px)' }}><span style={{ borderBottom: isActive('/work') ? '2px solid currentColor' : 'none' }}>WORK</span></Link>
        <Link href="/services" className="flex flex-col items-center justify-center shrink-0 text-center font-semibold font-['ABC_Diatype_Mono_Unlicensed_Trial'] leading-tight no-underline whitespace-nowrap" style={{ width: 'clamp(60px, 6.5vw, 118.75px)', fontSize: 'clamp(10px, 1vw, 17.5px)', color: textColor, transition: 'color 0.4s ease-in-out', minHeight: 'clamp(10px, 1vw, 17.5px)' }}><span style={{ borderBottom: isActive('/services') ? '2px solid currentColor' : 'none' }}>SERVICES</span></Link>
        <Link href="/about"    className="flex flex-col items-center justify-center shrink-0 text-center font-semibold font-['ABC_Diatype_Mono_Unlicensed_Trial'] leading-tight no-underline whitespace-nowrap" style={{ width: 'clamp(45px, 5vw, 88.75px)', fontSize: 'clamp(10px, 1vw, 17.5px)', color: textColor, transition: 'color 0.4s ease-in-out', minHeight: 'clamp(10px, 1vw, 17.5px)' }}><span style={{ borderBottom: isActive('/about') ? '2px solid currentColor' : 'none' }}>ABOUT</span></Link>
        <Link href="/blog"     className="flex flex-col items-center justify-center shrink-0 text-center font-semibold font-['ABC_Diatype_Mono_Unlicensed_Trial'] leading-tight no-underline whitespace-nowrap" style={{ width: 'clamp(40px, 5vw, 88.75px)', fontSize: 'clamp(10px, 1vw, 17.5px)', color: textColor, transition: 'color 0.4s ease-in-out', minHeight: 'clamp(10px, 1vw, 17.5px)' }}><span style={{ borderBottom: isActive('/blog') ? '2px solid currentColor' : 'none' }}>BLOG</span></Link>
      </div>
    </div>
  );
}
