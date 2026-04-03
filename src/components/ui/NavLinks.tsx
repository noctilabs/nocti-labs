'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

interface NavLinksProps {
  theme?: 'light' | 'dark';
}

const links = [
  { href: '/work', messageKey: 'work' },
  { href: '/services', messageKey: 'services' },
  { href: '/about', messageKey: 'about' },
  { href: '/blog', messageKey: 'blog' },
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
    <div className="relative h-[3.75rem] w-[30.0625rem] shrink min-w-0">
      <div className={`absolute inset-0 rounded-[3px] transition-[background-color] duration-[400ms] ease-in-out ${isDark ? 'bg-black' : 'bg-white'}`} />
      <div className="absolute inset-0 flex items-center px-[1.25rem]">
        <div className="grid w-full grid-cols-4 items-center gap-x-[0.625rem]">
          {links.map(({ href, messageKey }) => (
            <Link
              key={href}
              href={href}
              className={`${linkBase} ${textClass}`}
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
    </div>
  );
}
