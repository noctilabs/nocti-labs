import Link from 'next/link';

interface NavLogoProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export default function NavLogo({ className = '', theme = 'light' }: NavLogoProps) {
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'black' : 'white';
  const textColor = isDark ? 'white' : '#1e1e1e';

  return (
    <Link
      href="/"
      style={{ 
        width: 'clamp(80px, 9.67vw, 132px)', 
        height: 'clamp(36px, 4.4vw, 60px)', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 3, 
        flexShrink: 0, 
        minWidth: 0, 
        paddingLeft: 'clamp(9px, 9.09%, 12px)', 
        paddingRight: 'clamp(9px, 8.33%, 11px)',
        paddingTop: 'clamp(6px, 1.83vw, 11px)',
        paddingBottom: 'clamp(6px, 1.83vw, 11px)',
      }}
      className={`no-underline ${className}`}
    >
      <div style={{ width: '100%', height: '100%', left: 0, top: 0, position: 'absolute', background: bgColor, borderRadius: 3, transition: 'background-color 0.4s ease-in-out', zIndex: 0 }} />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: textColor,
          fontSize: 'clamp(14px, 1.68vw, 23px)',
          fontFamily: 'var(--font-display), "Helvetica Neue", Helvetica, Arial, sans-serif',
          fontWeight: '500',
          fontStyle: 'normal',
          fontSynthesis: 'none',
          lineHeight: '1',
          letterSpacing: '0',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          fontFeatureSettings: 'normal',
          textRendering: 'optimizeLegibility',
          transition: 'color 0.4s ease-in-out',
          whiteSpace: 'nowrap',
        }}
      >
        Nocti Labs
      </div>
    </Link>
  );
}
