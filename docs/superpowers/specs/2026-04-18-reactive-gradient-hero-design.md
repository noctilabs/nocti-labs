# Reactive Gradient Hero Background

**Date:** 2026-04-18  
**Status:** Approved

## Overview

Add an animated, mouse-reactive gradient blob overlay to the landing page hero section, layered on top of the existing SVG background image. The gradient blobs use `hard-light` blend mode to blend with the SVG rather than obscure it.

## Components

### New: `src/components/ui/BackgroundGradientAnimation.tsx`

The provided component code, copied verbatim. Exports:
- `BackgroundGradientAnimation` — the main animated component
- `BackgroundGradientAnimationProps` — its prop types

No modifications to the component itself.

### Modified: `src/components/sanity/blocks/SanityHero.tsx`

When `theme === 'blue'`, render `BackgroundGradientAnimation` as an absolute overlay inside the `<section>`:

- `className="absolute inset-0"` — overrides the component's default `fixed inset-0`
- `gradientBackgroundStart="transparent"` and `gradientBackgroundEnd="transparent"` — removes the component's own `linear-gradient` so the SVG background shows through
- `interactive={true}` — pointer blob follows cursor (default, no change needed)
- Wrapper opacity: `opacity-50` applied via className to keep the SVG legible beneath
- The component renders before the inner headline panel in the JSX, so the panel and heading naturally stack above it without any z-index changes

## What Does Not Change

- SVG background (`/noctiLabsBackgroundLanding.svg`) stays as `bgStyle` on the `<section>`
- Inner headline panel positioning and styling
- Heading text and typography
- Nav theme logic (`data-nav-theme`, `data-nav-logo-theme`)
- All other hero themes (light, dark, custom image)
- All other page blocks

## Constraints

- The gradient is only active for `theme === 'blue'`
- If a custom `backgroundImage` is provided in Sanity, it takes precedence (existing logic unchanged — `BackgroundGradientAnimation` is only rendered in the `else` branch that currently applies the SVG)
