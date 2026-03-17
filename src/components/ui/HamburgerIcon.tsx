interface HamburgerIconProps {
  color: string;
}

export default function HamburgerIcon({ color }: HamburgerIconProps) {
  return (
    <svg
      width="17"
      height="12"
      viewBox="0 0 17 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="4" height="12" rx="2" fill={color} />
      <rect x="13" width="4" height="12" rx="2" fill={color} />
    </svg>
  );
}
