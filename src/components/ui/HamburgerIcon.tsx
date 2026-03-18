interface HamburgerIconProps {
  color: string;
  open?: boolean;
}

export default function HamburgerIcon({ color, open = false }: HamburgerIconProps) {
  return (
    <div className="relative w-[17px] h-[17px] flex items-center justify-center">
      {/* Closed: two horizontal lines */}
      <svg
        width="17" height="5" viewBox="0 0 17 5" fill="none" xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ position: 'absolute', transition: 'opacity 250ms ease-in-out', opacity: open ? 0 : 1 }}
      >
        <line y1="0.5" x2="17" y2="0.5" stroke={color} />
        <line y1="4.5" x2="17" y2="4.5" stroke={color} />
      </svg>
      {/* Open: two vertical lines */}
      <svg
        width="5" height="17" viewBox="0 0 5 17" fill="none" xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ position: 'absolute', transition: 'opacity 250ms ease-in-out', opacity: open ? 1 : 0 }}
      >
        <line x1="4.5" y1="0" x2="4.5" y2="17" stroke={color} />
        <line x1="0.5" y1="0" x2="0.5" y2="17" stroke={color} />
      </svg>
    </div>
  );
}
