'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinksProps {
  theme?: 'light' | 'dark';
}

const links = [
  { href: '/work', label: 'WORK', width: 'w-[3.9375rem]' },
  { href: '/services', label: 'SERVICES', width: 'w-[5.9375rem]' },
  { href: '/about', label: 'ABOUT', width: 'w-[4.4375rem]' },
  { href: '/blog', label: 'BLOG', width: 'w-[4.4375rem]' },
] as const;

const linkBase = "flex flex-col items-center justify-center shrink-0 text-center no-underline whitespace-nowrap text-[0.875rem] font-mono font-medium not-italic leading-[1] tracking-[0] antialiased text-crisp transition-colors duration-[400ms] ease-in-out";

export default function NavLinks({ theme = 'light' }: NavLinksProps) {
  const isDark = theme === 'dark';
  const textClass = isDark ? 'text-white' : 'text-[#1e1e1e]';
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <div className="relative w-[30.0625rem] h-[3.75rem] shrink min-w-0">
      <div className={`absolute inset-0 rounded-[3px] transition-[background-color] duration-[400ms] ease-in-out ${isDark ? 'bg-black' : 'bg-white'}`} />
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center gap-[0.625rem] px-[1.25rem] h-full top-0">
        {links.map(({ href, label, width }) => (
          <Link
            key={href}
            href={href}
            className={`${linkBase} ${width} ${textClass}`}
          >
            <span className={isActive(href) ? 'border-b-2 border-current' : ''}>{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
