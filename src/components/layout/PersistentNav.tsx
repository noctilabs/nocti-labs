'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import NavLogo from '../ui/NavLogo';
import NavLinks from '../ui/NavLinks';
import NavContactButton from '../ui/NavContactButton';
import MobileMenuLinks from '../ui/MobileMenuLinks';
import HamburgerIcon from '../ui/HamburgerIcon';
import LocaleSwitcher from '../ui/LocaleSwitcher';

interface MobilePillProps {
  theme: 'light' | 'dark';
  menuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
}

function MobilePill({ theme, menuOpen, onToggleMenu, onCloseMenu }: MobilePillProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const isDark = theme === 'dark';
  const bg = isDark ? 'bg-black' : 'bg-white';
  const iconColor = isDark ? 'white' : '#1e1e1e';
  const textColor = isDark ? 'text-white' : 'text-[#1e1e1e]';

  return (
    <div className={`rounded-[3px] overflow-hidden ${bg} transition-[background-color] duration-[400ms] ease-in-out`}>
      <div className="flex items-center h-[49px] px-[15px]">
        <button
          onClick={onToggleMenu}
          aria-label={menuOpen ? t('aria.closeMenu') : t('aria.openMenu')}
          aria-expanded={menuOpen}
          aria-controls={`mobile-menu-${theme}`}
          className="flex items-center justify-center shrink-0 pointer-events-auto bg-transparent border-none cursor-pointer p-0"
        >
          <HamburgerIcon color={iconColor} open={menuOpen} />
        </button>
        <div className="flex-1 flex items-center justify-center">
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className={`text-[18px] font-display font-medium not-italic leading-[1] ${textColor} antialiased text-crisp transition-colors duration-[400ms] ease-in-out no-underline`}
          >
            {t('brandName')}
          </Link>
        </div>
        <div className="w-[1.0625rem] shrink-0" />
      </div>
      <div
        id={`mobile-menu-${theme}`}
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${menuOpen ? 'max-h-[185px]' : 'max-h-0'}`}
      >
        <MobileMenuLinks theme={theme} onLinkClick={onCloseMenu} />
      </div>
    </div>
  );
}

/**
 * Persistent navigation with pixel-perfect scroll-driven color inversion.
 * Desktop: two stacked navs (light + dark) clipped based on section themes.
 * Mobile: two stacked pill navs with hamburger + expandable link dropdown.
 */
export default function PersistentNav(): React.ReactElement {
  const darkNavRef = useRef<HTMLDivElement>(null);
  const lightNavRef = useRef<HTMLElement>(null);
  const darkMobileRef = useRef<HTMLDivElement>(null);
  const lightMobileRef = useRef<HTMLDivElement>(null);
  const darkLocaleRef = useRef<HTMLDivElement>(null);
  const lightLocaleRef = useRef<HTMLDivElement>(null);
  // Logo has independent clip logic: white text on dark bg, dark text on light bg
  const logoDarkRef = useRef<HTMLDivElement>(null);  // white text — shown on dark backgrounds
  const logoLightRef = useRef<HTMLDivElement>(null); // dark text — shown on light backgrounds
  const [menuOpen, setMenuOpen] = useState(false);

  // Hide-on-scroll: track accumulated offset with refs to avoid re-renders
  const lastScrollY = useRef(0);
  const navOffset = useRef(0); // current translateY in px (0 = visible, negative = hidden)
  const scrollDebt = useRef(0); // accumulated px in current direction before nav starts moving
  const wasAtBottom = useRef(false); // whether we were in the bottom-zone on the last frame
  /** 1 = scroll down, -1 = scroll up; kept when delta is 0 for sticky footer behavior. */
  const scrollDirectionRef = useRef(1);

  useEffect(() => {
    const SHOW_THRESHOLD = 80;  // don't start hiding until scrolled past this px
    const DELAY_PX = 40;        // px of scroll in one direction before the nav starts to follow

    const updateVisibility = (): void => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;
      if (delta > 0) {
        scrollDirectionRef.current = 1;
      } else if (delta < 0) {
        scrollDirectionRef.current = -1;
      }
      const scrollingUp = scrollDirectionRef.current < 0;

      /** Max upward shift when hiding the nav on scroll (separate from page-end detection). */
      const NAV_HIDE_CLEARANCE = 200;
      /** Only treat as "footer at bottom" when this close to the document end (avoids showing nav hundreds of px early). */
      const AT_PAGE_END_PX = 24;
      /** After visiting the true bottom, keep nav visible until this far from the end (hysteresis; must be > AT_PAGE_END_PX). */
      const FOOTER_STICKY_EXIT_PX = AT_PAGE_END_PX + 360;
      /** Reveal span in px; motion is eased so the bar slows into place instead of a linear “drop.” */
      const FOOTER_REVEAL_PX = NAV_HIDE_CLEARANCE;
      const easeInOutCubic = (t: number): number => {
        const x = Math.min(1, Math.max(0, t));
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
      };
      const footerRevealTranslateY = (gapPx: number): number => {
        const g = Math.min(Math.max(gapPx, 0), FOOTER_REVEAL_PX);
        const linearT = 1 - g / FOOTER_REVEAL_PX;
        const eased = easeInOutCubic(linearT);
        return -FOOTER_REVEAL_PX * (1 - eased);
      };
      const documentDistanceFromBottom = Math.max(
        0,
        document.documentElement.scrollHeight - (currentY + window.innerHeight),
      );
      const footerRevealEl = document.querySelector<HTMLElement>('[data-nav-footer-reveal]');
      /** Pixels the footer bottom still sits below the viewport bottom (0 = footer flush with viewport bottom). */
      const footerBottomGap =
        footerRevealEl != null
          ? Math.max(0, footerRevealEl.getBoundingClientRect().bottom - window.innerHeight)
          : documentDistanceFromBottom;
      /** Prefer footer geometry so reveal tracks the footer block, not only raw document scroll. */
      const endGap = footerRevealEl != null ? footerBottomGap : documentDistanceFromBottom;

      const applyNavY = (y: number): void => {
        navOffset.current = y;
        [lightNavRef, darkNavRef, logoLightRef, logoDarkRef, lightMobileRef, darkMobileRef].forEach((ref) => {
          if (ref.current) {
            ref.current.style.transition = 'none';
            ref.current.style.transform = `translateY(${y}px)`;
          }
        });
      };

      const atTruePageEnd = documentDistanceFromBottom <= AT_PAGE_END_PX;
      if (atTruePageEnd) {
        wasAtBottom.current = true;
        scrollDebt.current = 0;
        applyNavY(0);
        return;
      }

      const inFooterStickyScrollUp =
        wasAtBottom.current &&
        scrollingUp &&
        endGap <= FOOTER_STICKY_EXIT_PX &&
        documentDistanceFromBottom > AT_PAGE_END_PX &&
        currentY > SHOW_THRESHOLD;
      if (inFooterStickyScrollUp) {
        scrollDebt.current = 0;
        applyNavY(0);
        return;
      }

      if (endGap <= FOOTER_REVEAL_PX) {
        scrollDebt.current = 0;
        applyNavY(footerRevealTranslateY(endGap));
        return;
      }

      if (wasAtBottom.current) {
        if (endGap <= FOOTER_STICKY_EXIT_PX && currentY > SHOW_THRESHOLD) {
          scrollDebt.current = 0;
          applyNavY(footerRevealTranslateY(endGap));
          return;
        }
        wasAtBottom.current = false;
        scrollDebt.current = 0;
      }

      if (currentY <= SHOW_THRESHOLD) {
        // Near top — always fully visible
        wasAtBottom.current = false;
        navOffset.current = 0;
        scrollDebt.current = 0;
        [lightNavRef, darkNavRef, logoLightRef, logoDarkRef, lightMobileRef, darkMobileRef].forEach((ref) => {
          if (ref.current) {
            ref.current.style.transition = 'none';
            ref.current.style.transform = 'translateY(0)';
          }
        });
        return;
      }

      const navEls = [
        lightNavRef.current,
        darkNavRef.current,
        logoLightRef.current,
        logoDarkRef.current,
        lightMobileRef.current,
        darkMobileRef.current,
      ].filter(Boolean) as HTMLElement[];

      // Accumulate debt; reset if direction changes
      if (Math.sign(delta) !== Math.sign(scrollDebt.current) && delta !== 0) {
        scrollDebt.current = 0;
      }
      scrollDebt.current += delta;

      // Don't move until the user has scrolled DELAY_PX in one direction
      if (Math.abs(scrollDebt.current) < DELAY_PX) return;

      navOffset.current = Math.min(0, Math.max(-NAV_HIDE_CLEARANCE, navOffset.current - delta));
      navEls.forEach((el) => {
        el.style.transition = 'none';
        el.style.transform = `translateY(${navOffset.current}px)`;
      });
    };

    const updateClip = (): void => {
      const darkNav = darkNavRef.current;
      const lightNav = lightNavRef.current;
      if (!darkNav || !lightNav) return;

      // On mobile the desktop navs are display:none — fall back to the mobile pill for position
      const desktopRect = lightNav.getBoundingClientRect();
      const measureEl: Element = desktopRect.height === 0 && darkMobileRef.current ? darkMobileRef.current : lightNav;
      const navRect = measureEl.getBoundingClientRect();
      const navBarTop = navRect.top;
      const navBarBottom = navRect.bottom;
      const navHeight = navRect.height;
      if (navHeight === 0) return;

      const darkSections = document.querySelectorAll<HTMLElement>('[data-nav-theme="dark"]');
      const lightSections = document.querySelectorAll<HTMLElement>('[data-nav-theme="light"]');

      let darkOverlapTop = navBarBottom;
      let darkOverlapBottom = navBarTop;
      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const intTop = Math.max(navBarTop, rect.top);
        const intBottom = Math.min(navBarBottom, rect.bottom);
        if (intBottom > intTop) {
          darkOverlapTop = Math.min(darkOverlapTop, intTop);
          darkOverlapBottom = Math.max(darkOverlapBottom, intBottom);
        }
      });

      let lightOverlapTop = navBarBottom;
      let lightOverlapBottom = navBarTop;
      lightSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const intTop = Math.max(navBarTop, rect.top);
        const intBottom = Math.min(navBarBottom, rect.bottom);
        if (intBottom > intTop) {
          lightOverlapTop = Math.min(lightOverlapTop, intTop);
          lightOverlapBottom = Math.max(lightOverlapBottom, intBottom);
        }
      });

      const hasDarkOverlap = darkOverlapBottom > darkOverlapTop;
      const hasLightOverlap = lightOverlapBottom > lightOverlapTop;

      let lightClip: string;
      let darkClip: string;

      if (hasDarkOverlap && !hasLightOverlap) {
        lightClip = 'inset(0 0 0 0)';
        darkClip = 'inset(0 0 100% 0)';
      } else if (hasLightOverlap && !hasDarkOverlap) {
        lightClip = 'inset(0 0 100% 0)';
        darkClip = 'inset(0 0 0 0)';
      } else if (hasDarkOverlap && hasLightOverlap) {
        const darkTopPct = ((darkOverlapTop - navBarTop) / navHeight) * 100;
        const darkBottomPct = ((navBarBottom - darkOverlapBottom) / navHeight) * 100;
        lightClip = `inset(${Math.max(0, darkTopPct).toFixed(2)}% 0 ${Math.max(0, darkBottomPct).toFixed(2)}% 0)`;

        const lightTopPct = ((lightOverlapTop - navBarTop) / navHeight) * 100;
        const lightBottomPct = ((navBarBottom - lightOverlapBottom) / navHeight) * 100;
        darkClip = `inset(${Math.max(0, lightTopPct).toFixed(2)}% 0 ${Math.max(0, lightBottomPct).toFixed(2)}% 0)`;
      } else {
        lightClip = 'inset(0 0 100% 0)';
        darkClip = 'inset(0 0 0 0)';
      }

      lightNav.style.clipPath = lightClip;
      darkNav.style.clipPath = darkClip;

      if (lightMobileRef.current) lightMobileRef.current.style.clipPath = lightClip;
      if (darkMobileRef.current) darkMobileRef.current.style.clipPath = darkClip;

      // Logo independent clip: uses data-nav-theme but NOT the layout root wrapper,
      // so it correctly reads the actual section background colour.
      // dark bg → white logo (logoDarkRef), light bg → dark logo (logoLightRef).
      const logoEl = logoDarkRef.current ?? logoLightRef.current;
      if (logoEl && logoDarkRef.current && logoLightRef.current) {
        const lr = logoEl.getBoundingClientRect();
        const lTop = lr.top;
        const lBottom = lr.bottom;
        const lHeight = lr.height;
        if (lHeight > 0) {
          const logoSections = document.querySelectorAll<HTMLElement>(
            '[data-nav-theme]:not([data-nav-layout-root])',
          );
          let ldTop = lBottom, ldBottom = lTop; // dark-bg overlap
          let llTop = lBottom, llBottom = lTop; // light-bg overlap
          logoSections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const iTop = Math.max(lTop, rect.top);
            const iBottom = Math.min(lBottom, rect.bottom);
            if (iBottom <= iTop) return;
            // data-nav-logo-theme overrides data-nav-theme for the logo only
            const logoTheme = section.getAttribute('data-nav-logo-theme') ?? section.getAttribute('data-nav-theme');
            if (logoTheme === 'dark') {
              ldTop = Math.min(ldTop, iTop);
              ldBottom = Math.max(ldBottom, iBottom);
            } else {
              llTop = Math.min(llTop, iTop);
              llBottom = Math.max(llBottom, iBottom);
            }
          });
          const hasDark = ldBottom > ldTop;
          const hasLight = llBottom > llTop;
          let logoDarkClip: string;
          let logoLightClip: string;
          if (hasDark && !hasLight) {
            logoDarkClip = 'inset(0 0 0 0)';
            logoLightClip = 'inset(0 0 100% 0)';
          } else if (hasLight && !hasDark) {
            logoDarkClip = 'inset(0 0 100% 0)';
            logoLightClip = 'inset(0 0 0 0)';
          } else if (hasDark && hasLight) {
            const dTopPct = ((ldTop - lTop) / lHeight) * 100;
            const dBotPct = ((lBottom - ldBottom) / lHeight) * 100;
            logoDarkClip = `inset(${Math.max(0, dTopPct).toFixed(2)}% 0 ${Math.max(0, dBotPct).toFixed(2)}% 0)`;
            const lTopPct = ((llTop - lTop) / lHeight) * 100;
            const lBotPct = ((lBottom - llBottom) / lHeight) * 100;
            logoLightClip = `inset(${Math.max(0, lTopPct).toFixed(2)}% 0 ${Math.max(0, lBotPct).toFixed(2)}% 0)`;
          } else {
            // No section intersects the logo (e.g. first block starts below pt-[nav-offset]).
            // Fall back to the layout shell theme so the logo matches body/wrapper intent.
            const layoutRoot = document.querySelector<HTMLElement>(
              '[data-nav-layout-root][data-nav-theme]',
            );
            const rootTheme = layoutRoot?.getAttribute('data-nav-theme');
            if (rootTheme === 'dark') {
              logoDarkClip = 'inset(0 0 0 0)';
              logoLightClip = 'inset(0 0 100% 0)';
            } else {
              logoDarkClip = 'inset(0 0 100% 0)';
              logoLightClip = 'inset(0 0 0 0)';
            }
          }
          logoDarkRef.current.style.clipPath = logoDarkClip;
          logoLightRef.current.style.clipPath = logoLightClip;
        }
      }

      // Locale: bottom-fixed; optional data-locale-chrome overrides data-nav-theme for the toggle only.
      const resolveLocaleCap = (el: HTMLElement): 'white' | 'darkBubble' => {
        const chrome = el.getAttribute('data-locale-chrome');
        if (chrome === 'light') return 'white';
        if (chrome === 'dark') return 'darkBubble';
        const nav = el.getAttribute('data-nav-theme');
        if (nav === 'dark') return 'white';
        if (nav === 'light') return 'darkBubble';
        return 'darkBubble';
      };
      const localeCandidates = document.querySelectorAll<HTMLElement>(
        '[data-nav-theme]:not([data-nav-layout-root]), [data-locale-chrome]',
      );
      const localeDarkEl = darkLocaleRef.current;
      const localeLightEl = lightLocaleRef.current;
      if (localeDarkEl && localeLightEl) {
        const lr = localeDarkEl.getBoundingClientRect();
        const lTop = lr.top;
        const lBottom = lr.bottom;
        const lHeight = lr.height;
        if (lHeight > 0) {
          let whiteTop = lBottom;
          let whiteBottom = lTop;
          let bubbleTop = lBottom;
          let bubbleBottom = lTop;
          localeCandidates.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const intTop = Math.max(lTop, rect.top);
            const intBottom = Math.min(lBottom, rect.bottom);
            if (intBottom <= intTop) return;
            const cap = resolveLocaleCap(section);
            if (cap === 'white') {
              whiteTop = Math.min(whiteTop, intTop);
              whiteBottom = Math.max(whiteBottom, intBottom);
            } else {
              bubbleTop = Math.min(bubbleTop, intTop);
              bubbleBottom = Math.max(bubbleBottom, intBottom);
            }
          });
          const lHasWhite = whiteBottom > whiteTop;
          const lHasBubble = bubbleBottom > bubbleTop;
          let localeDarkClip: string;
          let localeLightClip: string;
          if (lHasWhite && !lHasBubble) {
            localeDarkClip = 'inset(0 0 0 0)';
            localeLightClip = 'inset(0 0 100% 0)';
          } else if (lHasBubble && !lHasWhite) {
            localeLightClip = 'inset(0 0 0 0)';
            localeDarkClip = 'inset(0 0 100% 0)';
          } else if (lHasWhite && lHasBubble) {
            const wTopPct = ((whiteTop - lTop) / lHeight) * 100;
            const wBotPct = ((lBottom - whiteBottom) / lHeight) * 100;
            localeDarkClip = `inset(${Math.max(0, wTopPct).toFixed(2)}% 0 ${Math.max(0, wBotPct).toFixed(2)}% 0)`;
            const bTopPct = ((bubbleTop - lTop) / lHeight) * 100;
            const bBotPct = ((lBottom - bubbleBottom) / lHeight) * 100;
            localeLightClip = `inset(${Math.max(0, bTopPct).toFixed(2)}% 0 ${Math.max(0, bBotPct).toFixed(2)}% 0)`;
          } else {
            localeLightClip = 'inset(0 0 0 0)';
            localeDarkClip = 'inset(0 0 100% 0)';
          }
          localeLightEl.style.clipPath = localeLightClip;
          localeDarkEl.style.clipPath = localeDarkClip;
        }
      }
    };

    const closeMenu = (): void => setMenuOpen(false);
    const onFrame = (): void => { requestAnimationFrame(updateClip); };
    const onScroll = (): void => {
      closeMenu();
      updateVisibility();
      requestAnimationFrame(updateClip);
    };

    updateClip();
    const rafId = requestAnimationFrame(updateClip);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onFrame);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onFrame);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((o) => !o);

  const desktopNavClass = "fixed top-[2.5rem] left-section-x right-section-x grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 z-[1000] min-w-0 overflow-visible pointer-events-auto hidden md:grid";

  const mobileNavClass = "fixed top-[0.75rem] left-[0.875rem] right-[0.875rem] z-[1000] pointer-events-auto md:hidden";

  return (
    <div className="fixed inset-x-0 top-0 z-[1000] pointer-events-none h-screen">
      {/* Desktop: Light nav */}
      <nav ref={lightNavRef} className={desktopNavClass} style={{ clipPath: 'inset(0 0 100% 0)' }}>
        {/* Logo placeholder — keeps grid layout; actual logo rendered independently below */}
        <div className="justify-self-start opacity-0 pointer-events-none" aria-hidden="true">
          <NavLogo theme="light" />
        </div>
        <div className="flex justify-center">
          <NavLinks theme="light" />
        </div>
        <NavContactButton className="justify-self-end" theme="light" />
      </nav>

      {/* Desktop: Dark nav */}
      <nav ref={darkNavRef} className={desktopNavClass}>
        {/* Logo placeholder — keeps grid layout; actual logo rendered independently below */}
        <div className="justify-self-start opacity-0 pointer-events-none" aria-hidden="true">
          <NavLogo theme="dark" />
        </div>
        <div className="flex justify-center">
          <NavLinks theme="dark" />
        </div>
        <NavContactButton className="justify-self-end" theme="dark" />
      </nav>

      {/* Desktop: Logo — independent clip logic, not tied to the nav clip system */}
      <div
        ref={logoLightRef}
        className="fixed top-[2.5rem] left-section-x z-[1001] pointer-events-auto hidden md:flex items-center"
        style={{ clipPath: 'inset(0 0 0 0)' }}
      >
        <NavLogo theme="light" />
      </div>
      <div
        ref={logoDarkRef}
        className="fixed top-[2.5rem] left-section-x z-[1001] pointer-events-auto hidden md:flex items-center"
        style={{ clipPath: 'inset(0 0 100% 0)' }}
      >
        <NavLogo theme="dark" />
      </div>

      {/* Mobile: Light pill */}
      <div ref={lightMobileRef} className={mobileNavClass} style={{ clipPath: 'inset(0 0 100% 0)' }}>
        <MobilePill theme="light" menuOpen={menuOpen} onToggleMenu={toggleMenu} onCloseMenu={closeMenu} />
      </div>

      {/* Mobile: Dark pill */}
      <div ref={darkMobileRef} className={mobileNavClass}>
        <MobilePill theme="dark" menuOpen={menuOpen} onToggleMenu={toggleMenu} onCloseMenu={closeMenu} />
      </div>

      {/* Locale switcher — light version */}
      <div ref={lightLocaleRef} className="fixed bottom-[2rem] right-[2rem] z-[1001] pointer-events-auto" style={{ clipPath: 'inset(0 0 100% 0)' }}>
        <LocaleSwitcher theme="light" />
      </div>

      {/* Locale switcher — dark version */}
      <div ref={darkLocaleRef} className="fixed bottom-[2rem] right-[2rem] z-[1001] pointer-events-auto">
        <LocaleSwitcher theme="dark" />
      </div>
    </div>
  );
}
