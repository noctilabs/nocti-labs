'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileMenuLinksProps {
  theme: 'light' | 'dark';
  onLinkClick: () => void;
}

const links = [
  { href: '/work', label: 'WORK' },
  { href: '/services', label: 'SERVICES' },
  { href: '/about', label: 'ABOUT' },
  { href: '/blog', label: 'BLOG' },
] as const;

export default function MobileMenuLinks({ theme, onLinkClick }: MobileMenuLinksProps) {
  const isDark = theme === 'dark';
  const textClass = isDark ? 'text-white' : 'text-[#1e1e1e]';
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center justify-center gap-[1.375rem] py-[1.375rem]">
      {links.map(({ href, label }) => {
        const isActive = pathname === href || pathname.startsWith(href + '/');
        return (
          <Link
            key={href}
            href={href}
            onClick={onLinkClick}
            className={`text-[0.875rem] font-mono font-medium not-italic leading-[1] tracking-[0] antialiased text-crisp no-underline transition-colors duration-[400ms] ease-in-out ${textClass}`}
          >
            <span className={isActive ? 'border-b-2 border-current' : ''}>{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
