'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

interface NavLogoProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export default function NavLogo({ className = '', theme = 'light' }: NavLogoProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const isDark = theme === 'dark';

  return (
    <Link
      href="/"
      onClick={(e) => {
        if (pathname === '/') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}
      className={`flex items-center justify-center shrink-0 min-w-0 no-underline ${className}`}
    >
      <span
        className={`flex items-center justify-center text-center text-[1.892rem] font-display font-medium not-italic leading-[1] tracking-[0] antialiased text-crisp transition-colors duration-[400ms] ease-in-out whitespace-nowrap w-[8.964rem] h-[3.125rem] ${isDark ? 'text-white' : 'text-[#1e1e1e]'}`}
      >
        {t('brandName')}
      </span>
    </Link>
  );
}
