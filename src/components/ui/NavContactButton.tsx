import Link from 'next/link';

export default function NavContactButton() {
  return (
    <Link
      href="/contact"
      className="relative inline-flex items-center justify-center w-[158px] h-[60px] bg-white rounded-[184px] text-black text-[14px] font-medium font-['ABC_Diatype_Mono_Unlicensed_Trial'] leading-[72px] no-underline gap-[8px]"
    >
      Contact Us
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 12L12 1M12 1H4M12 1V9" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </Link>
  );
}
