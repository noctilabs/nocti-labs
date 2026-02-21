import Link from 'next/link';

interface NavLogoProps {
  className?: string;
}

export default function NavLogo({ className = '' }: NavLogoProps) {
  return (
    <Link
      href="/"
      style={{ width: 'clamp(80px, 9vw, 165px)', height: 'clamp(36px, 4vw, 75px)', position: 'relative', display: 'block', borderRadius: 3 }}
      className={`no-underline ${className}`}
    >
      <div style={{ width: '100%', height: '100%', left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 3 }} />
      <div
        style={{
          width: '82.5%',
          height: '63.3%',
          left: '9.1%',
          top: '18.3%',
          position: 'absolute',
          textAlign: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          color: '#1E1E1E',
          fontSize: 'clamp(14px, 1.5vw, 28.75px)',
          fontFamily: 'Neue Haas Grotesk Display Std',
          fontWeight: '700',
          lineHeight: 72,
          wordWrap: 'break-word',
        }}
      >
        Nocti Labs
      </div>
    </Link>
  );
}
