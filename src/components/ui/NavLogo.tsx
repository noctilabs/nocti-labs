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
      className={`w-[8.25rem] h-[3.75rem] relative flex items-center justify-center rounded-[3px] shrink-0 min-w-0 px-[0.8125rem] no-underline ${className}`}
    >
      <div className={`absolute inset-0 rounded-[3px] z-0 transition-[background-color] duration-[400ms] ease-in-out ${isDark ? 'bg-black' : 'bg-white'}`} />
      <div
        className={`relative z-[1] text-center flex items-center justify-center text-[1.4375rem] font-display font-medium not-italic leading-[1] tracking-[0] antialiased text-crisp transition-colors duration-[400ms] ease-in-out whitespace-nowrap ${isDark ? 'text-white' : 'text-[#1e1e1e]'}`}
      >
        {t('brandName')}
      </div>
    </Link>
  );
}
