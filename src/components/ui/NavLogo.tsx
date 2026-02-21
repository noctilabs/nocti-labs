import Link from 'next/link';

export default function NavLogo() {
  return (
    <Link
      href="/"
      className="relative inline-flex items-center justify-center w-[132px] h-[60px] bg-white rounded-[3px] text-[#1e1e1e] text-[23px] font-bold font-['Neue_Haas_Grotesk_Display_Std'] leading-[72px] no-underline"
    >
      Nocti Labs
    </Link>
  );
}
