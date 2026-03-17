'use client';

import React, { useRef, useEffect, useState } from 'react';
import NavLogo from '../ui/NavLogo';
import NavLinks from '../ui/NavLinks';
import NavContactButton from '../ui/NavContactButton';
import MobileMenuLinks from '../ui/MobileMenuLinks';
import HamburgerIcon from '../ui/HamburgerIcon';

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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateClip = (): void => {
      const darkNav = darkNavRef.current;
      const lightNav = lightNavRef.current;
      if (!darkNav || !lightNav) return;

      const navRect = lightNav.getBoundingClientRect();
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
    };

    const closeMenu = (): void => setMenuOpen(false);
    const onFrame = (): void => { requestAnimationFrame(updateClip); };
    const onScroll = (): void => {
      closeMenu();
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

  const desktopNavClass = "fixed top-[2.5rem] left-section-x right-section-x grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 z-[1000] min-w-0 overflow-visible pointer-events-auto hidden md:grid";

  const mobileNavClass = "fixed top-[0.75rem] left-[0.875rem] right-[0.875rem] z-[1000] pointer-events-auto md:hidden";

  function MobilePill({ theme }: { theme: 'light' | 'dark' }) {
    const isDark = theme === 'dark';
    const bg = isDark ? 'bg-black' : 'bg-white';
    const iconColor = isDark ? 'white' : '#1e1e1e';
    const textColor = isDark ? 'text-white' : 'text-[#1e1e1e]';

    return (
      <div className={`rounded-[3px] overflow-hidden ${bg} transition-[background-color] duration-[400ms] ease-in-out`}>
        <div className="flex items-center h-[3.0625rem] px-[0.875rem]">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="flex items-center justify-center w-[2rem] h-[2rem] shrink-0 pointer-events-auto bg-transparent border-none cursor-pointer p-0"
          >
            <HamburgerIcon color={iconColor} />
          </button>
          <div className={`flex-1 text-center text-[1.125rem] font-display font-medium not-italic leading-[1] ${textColor} antialiased text-crisp transition-colors duration-[400ms] ease-in-out`}>
            Nocti Labs
          </div>
          <div className="w-[2rem] shrink-0" />
        </div>
        <div
          className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${menuOpen ? 'max-h-[10rem]' : 'max-h-0'}`}
        >
          <MobileMenuLinks theme={theme} onLinkClick={closeMenu} />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-x-0 top-0 z-[1000] pointer-events-none h-screen">
      {/* Desktop: Light nav */}
      <nav ref={lightNavRef} className={desktopNavClass} style={{ clipPath: 'inset(0 0 100% 0)' }}>
        <NavLogo className="justify-self-start" theme="light" />
        <div className="flex justify-center">
          <NavLinks theme="light" />
        </div>
        <NavContactButton className="justify-self-end" theme="light" />
      </nav>

      {/* Desktop: Dark nav */}
      <nav ref={darkNavRef} className={desktopNavClass}>
        <NavLogo className="justify-self-start" theme="dark" />
        <div className="flex justify-center">
          <NavLinks theme="dark" />
        </div>
        <NavContactButton className="justify-self-end" theme="dark" />
      </nav>

      {/* Mobile: Light pill */}
      <div ref={lightMobileRef} className={mobileNavClass} style={{ clipPath: 'inset(0 0 100% 0)' }}>
        <MobilePill theme="light" />
      </div>

      {/* Mobile: Dark pill */}
      <div ref={darkMobileRef} className={mobileNavClass}>
        <MobilePill theme="dark" />
      </div>
    </div>
  );
}
