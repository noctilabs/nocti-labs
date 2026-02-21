import Link from 'next/link';

export default function NavLinks() {
  return (
    <div className="relative w-[601.25px] h-[75px]">
      <div className="absolute top-0 left-0 w-[601.25px] h-[75px] bg-white rounded-[3px]" />
      <div className="absolute top-[15px] left-1/2 -translate-x-1/2 w-[551.25px] h-[46.25px] flex items-center justify-center gap-[12.5px] px-[25px]">
        <Link href="/work"     className="flex flex-col justify-center shrink-0 w-[78.75px] text-center text-[#1e1e1e] text-[17.5px] font-semibold font-['ABC_Diatype_Mono_Unlicensed_Trial'] leading-[72px] no-underline whitespace-nowrap">WORK</Link>
        <Link href="/services" className="flex flex-col justify-center shrink-0 w-[118.75px] h-[72px] text-center text-[#1e1e1e] text-[17.5px] font-semibold font-['ABC_Diatype_Mono_Unlicensed_Trial'] leading-[72px] no-underline whitespace-nowrap">SERVICES</Link>
        <Link href="/about"    className="flex flex-col justify-center shrink-0 w-[88.75px] text-center text-[#1e1e1e] text-[17.5px] font-semibold font-['ABC_Diatype_Mono_Unlicensed_Trial'] leading-[72px] no-underline whitespace-nowrap">ABOUT</Link>
        <Link href="/blog"     className="flex flex-col justify-center shrink-0 w-[88.75px] text-center text-[#1e1e1e] text-[17.5px] font-semibold font-['ABC_Diatype_Mono_Unlicensed_Trial'] leading-[72px] no-underline whitespace-nowrap">BLOG</Link>
      </div>
    </div>
  );
}
