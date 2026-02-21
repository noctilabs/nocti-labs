import Link from 'next/link';

interface NavLogoProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export default function NavLogo({ className = '', theme = 'light' }: NavLogoProps) {
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'black' : 'white';
  const textColor = isDark ? 'white' : '#1E1E1E';

  return (
    <Link
      href="/"
      style={{ width: 'clamp(80px, 9vw, 165px)', height: 'clamp(36px, 4vw, 75px)', position: 'relative', display: 'block', borderRadius: 3 }}
      className={`no-underline ${className}`}
    >
      <div style={{ width: '100%', height: '100%', left: 0, top: 0, position: 'absolute', background: bgColor, borderRadius: 3, transition: 'background-color 0.4s ease-in-out' }} />
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
          color: textColor,
          fontSize: 'clamp(12px, 1.2vw, 24px)',
          fontFamily: "'Neue Haas Grotesk Display Std', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontWeight: '700',
          lineHeight: '1',
          wordWrap: 'break-word',
          overflow: 'hidden',
          transition: 'color 0.4s ease-in-out',
        }}
      >
        Nocti Labs
      </div>
    </Link>
  );
}
