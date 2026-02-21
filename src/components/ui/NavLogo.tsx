import Link from 'next/link';

interface NavLogoProps {
  className?: string;
}

export default function NavLogo({ className = '' }: NavLogoProps) {
  return (
    <Link
      href="/"
      style={{ width: 165, height: 75, position: 'relative', display: 'block', borderRadius: 3 }}
      className={`no-underline ${className}`}
    >
      <div style={{ width: 165, height: 75, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 3 }} />
      <div
        style={{
          width: 136.25,
          height: 47.5,
          left: 15,
          top: 13.75,
          position: 'absolute',
          textAlign: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          color: '#1E1E1E',
          fontSize: 28.75,
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
