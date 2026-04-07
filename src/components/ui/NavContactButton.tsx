'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface NavContactButtonProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export default function NavContactButton({ className = '', theme = 'light' }: NavContactButtonProps) {
  const t = useTranslations('nav');
  const isDark = theme === 'dark';
  const isFooter = className?.includes('footer');

  return (
    <Link
      href="/contact"
      className={`relative inline-flex items-center justify-center no-underline w-[9.875rem] h-[2.8625rem] rounded-[30px] shrink-0 min-w-0 px-[1.25rem] gap-[0.5rem] transition-[background-color,color,border-color] duration-[400ms] ease-in-out border-2 ${isDark ? 'bg-black text-white border-black hover:bg-white hover:text-black hover:border-black' : isFooter ? 'bg-footer text-black border-footer hover:bg-black hover:text-white hover:border-white' : 'bg-white text-[#1e1e1e] border-white hover:bg-black hover:text-white hover:border-white'} ${className}`}
    >
      <div
        className="flex items-center justify-center leading-[1] text-[0.875rem] font-mono font-medium not-italic tracking-[0] antialiased text-crisp shrink-0 whitespace-nowrap"
      >
        {t('contact')}
      </div>
      <svg
        width="1.2rem"
        height="0.9rem"
        viewBox="0 0 16 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M1 6H15M15 6L10 1M15 6L10 11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
