import Link from 'next/link';

export default function NavLinks() {
  return (
    <div className="relative" style={{ width: 'clamp(481px, 60vw, 601.25px)', height: 'clamp(60px, 7.5vw, 75px)' }}>
      <div className="absolute top-0 left-0 w-full h-full bg-white rounded-[3px]" />
      <div className="absolute left-1/2 -translate-x-1/2 w-[91.5%] flex items-center justify-center gap-[10px] px-[25px]" style={{ top: 'clamp(12px, 1.5vw, 15px)', height: 'clamp(37px, 4.6vw, 46.25px)' }}>
        <Link href="/work"     className="flex flex-col justify-center shrink-0 text-center text-[#1e1e1e] font-semibold font-['ABC_Diatype_Mono_Unlicensed_Trial'] leading-[72px] no-underline whitespace-nowrap" style={{ width: 'clamp(63px, 8vw, 78.75px)', fontSize: 'clamp(14px, 1.75vw, 17.5px)' }}>WORK</Link>
        <Link href="/services" className="flex flex-col justify-center shrink-0 text-center text-[#1e1e1e] font-semibold font-['ABC_Diatype_Mono_Unlicensed_Trial'] leading-[72px] no-underline whitespace-nowrap" style={{ width: 'clamp(95px, 12vw, 118.75px)', fontSize: 'clamp(14px, 1.75vw, 17.5px)' }}>SERVICES</Link>
        <Link href="/about"    className="flex flex-col justify-center shrink-0 text-center text-[#1e1e1e] font-semibold font-['ABC_Diatype_Mono_Unlicensed_Trial'] leading-[72px] no-underline whitespace-nowrap" style={{ width: 'clamp(71px, 9vw, 88.75px)', fontSize: 'clamp(14px, 1.75vw, 17.5px)' }}>ABOUT</Link>
        <Link href="/blog"     className="flex flex-col justify-center shrink-0 text-center text-[#1e1e1e] font-semibold font-['ABC_Diatype_Mono_Unlicensed_Trial'] leading-[72px] no-underline whitespace-nowrap" style={{ width: 'clamp(71px, 9vw, 88.75px)', fontSize: 'clamp(14px, 1.75vw, 17.5px)' }}>BLOG</Link>
      </div>
    </div>
  );
}
