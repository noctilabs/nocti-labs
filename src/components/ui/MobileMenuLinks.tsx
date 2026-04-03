'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

interface MobileMenuLinksProps {
  theme: 'light' | 'dark';
  onLinkClick: () => void;
}

const links = [
  { href: '/work', messageKey: 'work' },
  { href: '/services', messageKey: 'services' },
  { href: '/about', messageKey: 'about' },
  { href: '/blog', messageKey: 'blog' },
  { href: '/contact', messageKey: 'contact' as const },
] as const;

export default function MobileMenuLinks({ theme, onLinkClick }: MobileMenuLinksProps) {
  const tNav = useTranslations('nav');
  const tLink = useTranslations('nav.link');
  const isDark = theme === 'dark';
  const textClass = isDark ? 'text-white' : 'text-[#1e1e1e]';
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center">
      {links.map(({ href, messageKey }) => {
        const isActive = pathname === href || pathname.startsWith(href + '/');
        const label =
          messageKey === 'contact' ? tNav('contact').toUpperCase() : tLink(messageKey);
        return (
          <Link
            key={href}
            href={href}
            onClick={onLinkClick}
            className={`text-[14px] font-mono font-medium not-italic leading-[37px] tracking-[0] antialiased text-crisp no-underline transition-colors duration-[400ms] ease-in-out ${textClass}`}
          >
            <span className={isActive ? 'border-b-2 border-current' : ''}>{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
