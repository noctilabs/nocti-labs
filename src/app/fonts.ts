import localFont from 'next/font/local';

/**
 * Neue Haas Grotesk Display Std Medium (65 Medium)
 * Used for display text like the logo
 */
export const displayFont = localFont({
  src: '../../public/fonts/NHaasGroteskDSStd-65Md.otf',
  variable: '--font-display',
  weight: '500',
  style: 'normal',
  display: 'swap',
});

/**
 * Neue Haas Unica Pro Medium
 * Used for body text and headings
 */
export const bodyFont = localFont({
  src: '../../public/fonts/NeueHaasUnicaPro-Medium.ttf',
  variable: '--font-body',
  weight: '500',
  style: 'normal',
  display: 'swap',
});

/**
 * ABC Diatype Mono Unlicensed Trial Medium
 * Used for monospace text like navigation links
 */
export const monoFont = localFont({
  src: '../../public/fonts/ABCDiatypeMono-Medium-Trial.otf',
  variable: '--font-mono',
  weight: '500',
  style: 'normal',
  display: 'swap',
});
