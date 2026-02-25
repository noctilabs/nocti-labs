'use client';

import React, { useRef, useEffect } from 'react';
import NavLogo from '../ui/NavLogo';
import NavLinks from '../ui/NavLinks';
import NavContactButton from '../ui/NavContactButton';

/**
 * Persistent navigation with pixel-perfect scroll-driven color inversion.
 * Renders two stacked navs (light + dark). The dark nav (black bg, white text)
 * is visible by default and shows over white/default backgrounds, clipped to hide over dark sections.
 * The light nav (white bg, dark text) is clipped to show only over dark sections.
 */
export default function PersistentNav(): React.ReactElement {
  const darkNavRef = useRef<HTMLDivElement>(null);
  const lightNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateClip = (): void => {
      const darkNav = darkNavRef.current;
      const lightNav = lightNavRef.current;
      if (!darkNav || !lightNav) return;

      // Get the actual nav bar position from the DOM
      const navRect = lightNav.getBoundingClientRect();
      const navBarTop = navRect.top;
      const navBarBottom = navRect.bottom;
      const navHeight = navRect.height;
      if (navHeight === 0) return;

      const darkSections = document.querySelectorAll<HTMLElement>('[data-nav-theme="dark"]');
      const lightSections = document.querySelectorAll<HTMLElement>('[data-nav-theme="light"]');

      // Calculate overlap for dark sections (show light nav)
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

      // Calculate overlap for light sections (show dark nav)
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

      if (hasDarkOverlap && !hasLightOverlap) {
        // Only dark sections - show light nav fully
        lightNav.style.clipPath = 'inset(0 0 0 0)';
        darkNav.style.clipPath = 'inset(0 0 100% 0)';
      } else if (hasLightOverlap && !hasDarkOverlap) {
        // Only light sections - show dark nav fully
        lightNav.style.clipPath = 'inset(0 0 100% 0)';
        darkNav.style.clipPath = 'inset(0 0 0 0)';
      } else if (hasDarkOverlap && hasLightOverlap) {
        // Both sections - need to clip both navs
        // Light nav shows over dark sections
        const darkTopPct = ((darkOverlapTop - navBarTop) / navHeight) * 100;
        const darkBottomPct = ((navBarBottom - darkOverlapBottom) / navHeight) * 100;
        const lightNavClip = `inset(${Math.max(0, darkTopPct).toFixed(2)}% 0 ${Math.max(0, darkBottomPct).toFixed(2)}% 0)`;
        lightNav.style.clipPath = lightNavClip;

        // Dark nav shows over light sections
        const lightTopPct = ((lightOverlapTop - navBarTop) / navHeight) * 100;
        const lightBottomPct = ((navBarBottom - lightOverlapBottom) / navHeight) * 100;
        const darkNavClip = `inset(${Math.max(0, lightTopPct).toFixed(2)}% 0 ${Math.max(0, lightBottomPct).toFixed(2)}% 0)`;
        darkNav.style.clipPath = darkNavClip;
      } else {
        // No sections detected - default to dark nav (black nav on white/default backgrounds)
        lightNav.style.clipPath = 'inset(0 0 100% 0)';
        darkNav.style.clipPath = 'inset(0 0 0 0)';
      }
    };

    const onFrame = (): void => { requestAnimationFrame(updateClip); };

    updateClip();
    const rafId = requestAnimationFrame(updateClip);
    window.addEventListener('scroll', onFrame, { passive: true });
    window.addEventListener('resize', onFrame);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onFrame);
      window.removeEventListener('resize', onFrame);
    };
  }, []);

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 'clamp(20px, 2.5vw, 35px)',
    left: 'clamp(20px, 3vw, 40px)',
    right: 'clamp(20px, 3vw, 40px)',
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center',
    gap: 'clamp(10px, 1.5vw, 22.2px)',
    zIndex: 1000,
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, pointerEvents: 'none', height: '100vh' }}>
      {/* Light nav — clipped to show only over dark sections (white nav on black backgrounds) */}
      <nav ref={lightNavRef} data-cursor-element-id="cursor-el-126" style={{ ...navStyle, pointerEvents: 'auto', clipPath: 'inset(0 0 100% 0)' }}>
        <NavLogo className="justify-self-start" theme="light" />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <NavLinks theme="light" />
        </div>
        <NavContactButton className="justify-self-end" theme="light" />
      </nav>

      {/* Dark nav — visible by default, clipped to hide over dark sections (black nav on white backgrounds) */}
      <nav ref={darkNavRef} style={{ ...navStyle, pointerEvents: 'auto' }}>
        <NavLogo className="justify-self-start" theme="dark" />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <NavLinks theme="dark" />
        </div>
        <NavContactButton className="justify-self-end" theme="dark" />
      </nav>
    </div>
  );
}
