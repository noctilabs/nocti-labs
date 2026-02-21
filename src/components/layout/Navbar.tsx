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
        className={`hidden md:block md:justify-self-end ${pillBgColor} ${pillTextColor} px-6 py-2 rounded-full font-mono uppercase text-[14px] font-bold whitespace-nowrap hover:opacity-80 transition`}
      >
        Contact Us →
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
            className={`${pillBgColor} ${pillTextColor} px-6 py-2 rounded-full font-mono uppercase text-sm font-bold text-center`}
          >
            Contact Us →
          </Link>
        </div>
      )}
    </nav>
  );
}
