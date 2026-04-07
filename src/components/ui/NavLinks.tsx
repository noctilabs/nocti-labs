'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

interface NavLinksProps {
  theme?: 'light' | 'dark';
}

const links = [
  { href: '/work', messageKey: 'work', width: '3.9375rem' },
  { href: '/services', messageKey: 'services', width: '5.9673rem' },
  { href: '/about', messageKey: 'about', width: '4.4375rem' },
  { href: '/blog', messageKey: 'blog', width: '4.4159rem' },
] as const;

const linkBase =
  'flex flex-col items-center justify-center text-center no-underline text-[0.875rem] font-mono font-medium not-italic leading-[1] tracking-[0] antialiased text-crisp transition-colors duration-[400ms] ease-in-out hover:opacity-75';

export default function NavLinks({ theme = 'light' }: NavLinksProps) {
  const t = useTranslations('nav.link');
  const isDark = theme === 'dark';
  const textClass = isDark ? 'text-white' : 'text-[#1e1e1e]';
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <div className="relative h-[2.8625rem] w-[24.812rem] shrink-0">
      <div className={`absolute inset-0 rounded-[24px] transition-[background-color] duration-[400ms] ease-in-out ${isDark ? 'bg-black' : 'bg-white'}`} />
      <div className="absolute inset-0 flex items-center justify-center px-[1.25rem] gap-[0.625rem]">
        {links.map(({ href, messageKey, width }) => (
          <Link
            key={href}
            href={href}
            style={{ width }}
            className={`${linkBase} ${textClass} shrink-0`}
          >
            <span
              className={`whitespace-nowrap transition-all duration-[400ms] ease-in-out ${isActive(href) ? 'border-b-2 border-current' : 'border-b-2 border-transparent hover:border-current'}`}
            >
              {t(messageKey)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
