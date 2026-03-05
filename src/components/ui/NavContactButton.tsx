import Link from 'next/link';

interface NavContactButtonProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export default function NavContactButton({ className = '', theme = 'light' }: NavContactButtonProps) {
  const isDark = theme === 'dark';
  const arrowColor = isDark ? 'white' : '#1e1e1e';

  return (
    <Link
      href="/contact"
      className={`relative inline-flex items-center justify-center no-underline w-[9.875rem] h-[3.75rem] rounded-[184px] shrink-0 min-w-0 px-[1.25rem] gap-[0.5rem] transition-[background-color,color] duration-[400ms] ease-in-out ${isDark ? 'bg-black text-white' : 'bg-white text-[#1e1e1e]'} ${className}`}
    >
      <div
        className="flex items-center justify-center leading-[1] text-[0.875rem] font-mono font-medium not-italic tracking-[0] antialiased text-crisp shrink-0 whitespace-nowrap"
      >
        Contact Us
      </div>
      <svg
        width="0.9rem"
        height="1rem"
        viewBox="0 0 15 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        style={{ transition: 'fill 0.4s ease-in-out' }}
      >
        <path
          d="M14.336 0.68321C14.3071 0.277208 13.9429 -0.0276045 13.5227 0.00239133L6.67516 0.491211C6.25496 0.521208 5.93782 0.874654 5.9668 1.28066C5.99578 1.68666 6.35992 1.99147 6.78012 1.96148L12.8668 1.52697L13.2867 7.40802C13.3156 7.81403 13.6798 8.11884 14.1 8.08884C14.5202 8.05885 14.8373 7.7054 14.8083 7.2994L14.336 0.68321ZM0.575195 15.2256L1.1503 15.707L14.1503 1.21894L13.5752 0.737524L13.0001 0.256112L9.26405e-09 14.7442L0.575195 15.2256Z"
          fill={arrowColor}
          style={{ transition: 'fill 0.4s ease-in-out' }}
        />
      </svg>
    </Link>
  );
}
