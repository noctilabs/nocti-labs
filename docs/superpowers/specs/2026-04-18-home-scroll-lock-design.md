# Home Page Scroll Lock Design

**Date:** 2026-04-18  
**Status:** Approved

## Overview

Add a scroll-pause effect to the home page only. As the user scrolls down and a new sticky section slides into full view, scrolling is briefly locked (minimum 400ms) so the user is forced to register the new section before continuing. Uses Lenis for smooth scroll control.

## Architecture

- Install `lenis` npm package
- `HomeScrollLock` — new client component that owns the Lenis instance and IntersectionObserver lock logic
- `PageBuilder` — modified to wrap `<main>` in `HomeScrollLock` when `pageSlug === 'home'`, and to add `scroll-section` class to sticky block wrapper divs

## Component: `src/components/layout/HomeScrollLock.tsx`

Client component (`"use client"`). Accepts `children: React.ReactNode`.

**On mount:**
- Initialise a `Lenis` instance (default options, smooth scroll)
- Start the RAF loop via `requestAnimationFrame`
- Set up an `IntersectionObserver` with threshold `0.95` watching all `.scroll-section` elements
- Clean up on unmount: destroy Lenis, cancel RAF, disconnect observer

**Lock logic:**
- When a `.scroll-section` fires at ≥95% visibility:
  - Skip if it is the first section (index 0 — the hero)
  - Skip if it has already been seen (tracked via a `Set` of elements in a ref)
  - Call `lenis.stop()`
  - After `400ms`, call `lenis.start()`
  - Mark the section as seen so it does not re-lock

## PageBuilder changes (`src/components/sanity/PageBuilder.tsx`)

- Import `HomeScrollLock` (lazy, client-only)
- When `pageSlug === 'home'`, wrap `<main>` in `<HomeScrollLock>`
- For each block wrapper `div` that is currently `sticky top-0`, add class `scroll-section`
- `noSticky` blocks (`aboutSection`, `missionSection`) do **not** get `scroll-section` — they scroll normally

## Constraints

- Effect is home page only (`pageSlug === 'home'`)
- No changes to individual block components
- Lenis instance is local to `HomeScrollLock` — other pages use native browser scroll
- No lock on the hero (index 0) — the user arrives there on load, not by scrolling into it
- Each section locks at most once per page load (seen set prevents re-locking on scroll-up)
