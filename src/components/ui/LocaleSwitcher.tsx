'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { useTransition, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

/** Matches `p-[3px]` on the track. */
const TRACK_PAD_PX = 3

// Viscous settle ease — slow overshoot, lazy return
const LAVA_EASE = 'cubic-bezier(0.25, 0.1, 0.25, 1.15)'

interface LocaleSwitcherProps {
  theme?: 'light' | 'dark'
}

export default function LocaleSwitcher({ theme = 'dark' }: LocaleSwitcherProps) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const buttonRef = useRef<HTMLButtonElement>(null)
  const bubbleRef = useRef<HTMLSpanElement>(null)
  const travelPxRef = useRef(0)
  const visualLocaleRef = useRef<'en' | 'es'>(locale as 'en' | 'es')
  const isEN = locale === 'en'
  const isDark = theme === 'dark'

  const measureTravelPx = useCallback((): number => {
    const btn = buttonRef.current
    const bubble = bubbleRef.current
    if (!btn || !bubble) return travelPxRef.current
    const t = btn.offsetWidth - 2 * TRACK_PAD_PX - bubble.offsetWidth
    travelPxRef.current = Math.max(0, t)
    return travelPxRef.current
  }, [])

  const applyBubbleX = useCallback(
    (lang: 'en' | 'es') => {
      const bubble = bubbleRef.current
      if (!bubble) return
      const x = lang === 'en' ? 0 : measureTravelPx()
      gsap.set(bubble, { x })
    },
    [measureTravelPx],
  )

  useLayoutEffect(() => {
    measureTravelPx()
    applyBubbleX(locale as 'en' | 'es')
    visualLocaleRef.current = locale as 'en' | 'es'
  }, [locale, measureTravelPx, applyBubbleX, theme])

  useEffect(() => {
    const btn = buttonRef.current
    if (!btn || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => {
      measureTravelPx()
      applyBubbleX(visualLocaleRef.current)
    })
    ro.observe(btn)
    return () => ro.disconnect()
  }, [measureTravelPx, applyBubbleX])

  function toggle() {
    const bubble = bubbleRef.current
    if (!bubble || isPending) return

    const movingRight = visualLocaleRef.current === 'en'
    visualLocaleRef.current = movingRight ? 'es' : 'en'
    const travel = measureTravelPx()
    const targetX = movingRight ? travel : 0

    gsap.killTweensOf(bubble)

    gsap.timeline()
      .to(bubble, {
        x: targetX * 0.35,
        scaleX: 1.55, scaleY: 0.78,
        duration: 0.32,
        ease: 'power1.in',
      })
      .to(bubble, {
        x: targetX * 0.65,
        scaleX: 0.82, scaleY: 1.22,
        duration: 0.22,
        ease: 'none',
      })
      .to(bubble, {
        x: targetX,
        scaleX: 1.28, scaleY: 0.85,
        duration: 0.2,
        ease: 'power2.out',
      })
      .to(bubble, {
        x: targetX,
        scaleX: 1,
        scaleY: 1,
        duration: 1.1,
        ease: LAVA_EASE,
      })

    startTransition(() => {
      router.replace(pathname, { locale: movingRight ? 'es' : 'en' })
    })
  }

  const bubbleSize = 'calc(2.25rem - 6px)'

  // Theme-aware colors
  const trackBg = isDark ? 'transparent' : 'transparent'
  const trackShadow = isDark
    ? 'inset 0 0 0 1.5px #ffffff'
    : 'inset 0 0 0 1.5px #000000'
  const bubbleBg = isDark ? '#ffffff' : '#1e1e1e'
  const activeLabel = isDark ? '#1e1e1e' : '#ffffff'
  const inactiveLabel = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'

  return (
    <button
      ref={buttonRef}
      onClick={toggle}
      disabled={isPending}
      aria-label={isEN ? 'Switch to Spanish' : 'Switch to English'}
      className="pointer-events-auto relative flex items-center w-[4.5rem] h-[2.25rem] rounded-full p-[3px] disabled:opacity-50 overflow-hidden"
      style={{
        background: trackBg,
        boxShadow: trackShadow,
      }}
    >
      <span
        ref={bubbleRef}
        style={{
          position: 'absolute',
          top: '3px',
          left: '3px',
          height: bubbleSize,
          width: bubbleSize,
          background: bubbleBg,
          borderRadius: '9999px',
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      />

      <span
        className="relative z-10 flex-1 text-center text-[0.625rem] font-mono font-medium tracking-[0.04em] uppercase leading-none transition-colors duration-300"
        style={{ color: isEN ? activeLabel : inactiveLabel }}
      >
        EN
      </span>
      <span
        className="relative z-10 flex-1 text-center text-[0.625rem] font-mono font-medium tracking-[0.04em] uppercase leading-none transition-colors duration-300"
        style={{ color: isEN ? inactiveLabel : activeLabel }}
      >
        ES
      </span>
    </button>
  )
}
