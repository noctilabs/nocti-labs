import Link from 'next/link';

interface NavLinksProps {
  theme?: 'light' | 'dark';
}

export default function NavLinks({ theme = 'light' }: NavLinksProps) {
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'black' : 'white';
  const textColor = isDark ? 'white' : '#1e1e1e';

  return (
    <div className="relative" style={{ width: 'clamp(280px, 32vw, 601.25px)', height: 'clamp(36px, 4vw, 75px)' }}>
      <div className="absolute top-0 left-0 w-full h-full rounded-[3px]" style={{ background: bgColor, transition: 'background-color 0.4s ease-in-out' }} />
      <div className="absolute left-1/2 -translate-x-1/2 w-[91.5%] flex items-center justify-center gap-[10px] px-[25px]" style={{ top: 'clamp(6px, 0.8vw, 15px)', height: 'clamp(24px, 2.4vw, 46.25px)' }}>
        <Link href="/work"     className="flex flex-col justify-center shrink-0 text-center font-semibold font-['ABC_Diatype_Mono_Unlicensed_Trial'] leading-[72px] no-underline whitespace-nowrap" style={{ width: 'clamp(40px, 4.5vw, 78.75px)', fontSize: 'clamp(10px, 1vw, 17.5px)', color: textColor, transition: 'color 0.4s ease-in-out' }}>WORK</Link>
        <Link href="/services" className="flex flex-col justify-center shrink-0 text-center font-semibold font-['ABC_Diatype_Mono_Unlicensed_Trial'] leading-[72px] no-underline whitespace-nowrap" style={{ width: 'clamp(60px, 6.5vw, 118.75px)', fontSize: 'clamp(10px, 1vw, 17.5px)', color: textColor, transition: 'color 0.4s ease-in-out' }}>SERVICES</Link>
        <Link href="/about"    className="flex flex-col justify-center shrink-0 text-center font-semibold font-['ABC_Diatype_Mono_Unlicensed_Trial'] leading-[72px] no-underline whitespace-nowrap" style={{ width: 'clamp(45px, 5vw, 88.75px)', fontSize: 'clamp(10px, 1vw, 17.5px)', color: textColor, transition: 'color 0.4s ease-in-out' }}>ABOUT</Link>
        <Link href="/blog"     className="flex flex-col justify-center shrink-0 text-center font-semibold font-['ABC_Diatype_Mono_Unlicensed_Trial'] leading-[72px] no-underline whitespace-nowrap" style={{ width: 'clamp(40px, 5vw, 88.75px)', fontSize: 'clamp(10px, 1vw, 17.5px)', color: textColor, transition: 'color 0.4s ease-in-out' }}>BLOG</Link>
      </div>
    </div>
  );
}
