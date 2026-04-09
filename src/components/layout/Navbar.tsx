'use client';

import { useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
  theme?: 'dark' | 'light';
}

export default function Navbar({ theme = 'dark' }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const pillBgColor = isDark ? 'bg-white' : 'bg-black';
  const pillTextColor = isDark ? 'text-black' : 'text-white';
  const navTextColor = isDark ? 'text-white' : 'text-black';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${bgColor} px-8 py-4 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] md:items-center`}>
      {/* Logo */}
      <Link
        href="/"
        className={`${pillBgColor} ${pillTextColor} px-6 py-2 rounded-full text-[23px] font-display font-bold whitespace-nowrap md:justify-self-start`}
      >
        Nocti Labs
      </Link>

      {/* Desktop Nav */}
      <div className={`hidden md:flex md:justify-self-center font-mono uppercase text-[14px] gap-8 ${navTextColor}`}>
        <Link href="/work" className="hover:opacity-70 transition">Work</Link>
        <Link href="/services" className="hover:opacity-70 transition">Services</Link>
        <Link href="/about" className="hover:opacity-70 transition">About</Link>
        <Link href="/blog" className="hover:opacity-70 transition">Blog</Link>
      </div>

      {/* CTA Button */}
      <Link
        href="/contact"
        className={`hidden md:flex md:justify-self-end items-center justify-between gap-4 ${pillBgColor} ${pillTextColor} pl-[1.5rem] pr-[0.625rem] py-[0.625rem] rounded-full font-mono uppercase text-[14px] font-medium whitespace-nowrap hover:opacity-80 transition`}
      >
        Contact Us
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0"><path d="M8.08243 1.88383L-0.000118643 9.94319L1.3238 11.2709L9.40635 3.21156L9.39568 10.6362L11.2684 10.6223L11.2837 0.0157L0.677075 0.000466406L0.657813 1.87317L8.08243 1.88383Z" fill="currentColor"/></svg>
      </Link>

      {/* Mobile Menu Button */}
      <button
        className={`md:hidden ${navTextColor} text-2xl`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`absolute top-full left-0 right-0 ${bgColor} flex flex-col gap-4 p-8 md:hidden border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <Link href="/work" className={`${navTextColor} font-mono uppercase text-sm`}>Work</Link>
          <Link href="/services" className={`${navTextColor} font-mono uppercase text-sm`}>Services</Link>
          <Link href="/about" className={`${navTextColor} font-mono uppercase text-sm`}>About</Link>
          <Link href="/blog" className={`${navTextColor} font-mono uppercase text-sm`}>Blog</Link>
          <Link
            href="/contact"
            className={`flex items-center justify-between gap-4 ${pillBgColor} ${pillTextColor} pl-[1.5rem] pr-[0.625rem] py-[0.625rem] rounded-full font-mono uppercase text-sm font-medium`}
          >
            Contact Us
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0"><path d="M8.08243 1.88383L-0.000118643 9.94319L1.3238 11.2709L9.40635 3.21156L9.39568 10.6362L11.2684 10.6223L11.2837 0.0157L0.677075 0.000466406L0.657813 1.87317L8.08243 1.88383Z" fill="currentColor"/></svg>
          </Link>
        </div>
      )}
    </nav>
  );
}
