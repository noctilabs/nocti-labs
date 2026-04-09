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
      className={`relative inline-flex items-center justify-center no-underline w-[9.875rem] h-[2.8625rem] rounded-[30px] shrink-0 min-w-0 px-[1.25rem] gap-[0.875rem] transition-[background-color,color,border-color] duration-[400ms] ease-in-out border-2 ${isDark ? 'bg-black text-white border-black hover:bg-white hover:text-black hover:border-black' : isFooter ? 'bg-footer text-black border-footer hover:bg-black hover:text-white hover:border-white' : 'bg-white text-[#1e1e1e] border-white hover:bg-black hover:text-white hover:border-white'} ${className}`}
    >
      <div
        className="flex items-center justify-center leading-[1] text-[0.875rem] font-mono font-medium not-italic tracking-[0] antialiased text-crisp shrink-0 whitespace-nowrap"
      >
        {t('contact')}
      </div>
      <svg
        width="0.75rem"
        height="0.75rem"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M8.08243 1.88383L-0.000118643 9.94319L1.3238 11.2709L9.40635 3.21156L9.39568 10.6362L11.2684 10.6223L11.2837 0.0157L0.677075 0.000466406L0.657813 1.87317L8.08243 1.88383Z"
          fill="currentColor"
        />
      </svg>
    </Link>
  );
}
