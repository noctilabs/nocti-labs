import Link from 'next/link';

interface NavLogoProps {
  className?: string;
}

export default function NavLogo({ className = '' }: NavLogoProps) {
  return (
    <Link
      href="/"
      style={{ width: 132, height: 60, position: 'relative', display: 'block', borderRadius: 3 }}
      className={`no-underline ${className}`}
    >
      <div style={{ width: 132, height: 60, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 3 }} />
      <div
        style={{
          width: 109,
          height: 38,
          left: 12,
          top: 11,
          position: 'absolute',
          textAlign: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          color: '#1E1E1E',
          fontSize: 23,
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
