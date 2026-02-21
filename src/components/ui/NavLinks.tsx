import Link from 'next/link';

export default function NavLinks() {
  return (
    <div className="relative w-[481px] h-[60px]">
      <div className="absolute top-0 left-0 w-[481px] h-[60px] bg-white rounded-[3px]" />
      <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[441px] h-[37px] flex items-center justify-center gap-[10px] px-[20px]">
        <Link href="/work"     className="flex flex-col justify-center shrink-0 w-[63px] text-center text-[#1e1e1e] text-[14px] font-semibold font-['ABC_Diatype_Mono_Unlicensed_Trial'] leading-[72px] no-underline whitespace-nowrap">WORK</Link>
        <Link href="/services" className="flex flex-col justify-center shrink-0 w-[95px] h-[72px] text-center text-[#1e1e1e] text-[14px] font-semibold font-['ABC_Diatype_Mono_Unlicensed_Trial'] leading-[72px] no-underline whitespace-nowrap">SERVICES</Link>
        <Link href="/about"    className="flex flex-col justify-center shrink-0 w-[71px] text-center text-[#1e1e1e] text-[14px] font-semibold font-['ABC_Diatype_Mono_Unlicensed_Trial'] leading-[72px] no-underline whitespace-nowrap">ABOUT</Link>
        <Link href="/blog"     className="flex flex-col justify-center shrink-0 w-[71px] text-center text-[#1e1e1e] text-[14px] font-semibold font-['ABC_Diatype_Mono_Unlicensed_Trial'] leading-[72px] no-underline whitespace-nowrap">BLOG</Link>
      </div>
    </div>
  );
}
