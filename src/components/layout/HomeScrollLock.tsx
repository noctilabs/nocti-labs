"use client"

import Lenis from "lenis"
import { useEffect, useRef } from "react"

export default function HomeScrollLock({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const seenRef = useRef<Set<Element>>(new Set())
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const lenis = new Lenis()
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    const sections = Array.from(document.querySelectorAll(".scroll-section"))

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const index = sections.indexOf(entry.target)
          // Skip the hero (index 0) and already-seen sections
          if (index === 0) continue
          if (seenRef.current.has(entry.target)) continue

          seenRef.current.add(entry.target)
          lenis.stop()
          setTimeout(() => lenis.start(), 900)
        }
      },
      { threshold: 1.0 },
    )

    sections.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
