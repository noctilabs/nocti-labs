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
 * Neue Haas Unica Pro (Regular + Medium)
 * Used for body text and headings
 */
export const bodyFont = localFont({
  src: [
    {
      path: '../../public/fonts/NeueHaasUnicaPro-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NeueHaasUnicaPro-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-body',
  display: 'swap',
});

/**
 * ABC Diatype Mono Unlicensed Trial (Regular + Medium)
 * Used for monospace text like navigation links and labels
 */
export const monoFont = localFont({
  src: [
    {
      path: '../../public/fonts/ABCDiatypeMono-Regular-Trial.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ABCDiatypeMono-Medium-Trial.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ABCDiatypeMono-Bold-Trial.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-mono',
  display: 'swap',
});
