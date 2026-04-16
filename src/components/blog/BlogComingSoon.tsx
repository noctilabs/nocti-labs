'use client'

import { useEffect, useRef } from 'react'
import { useLocale } from 'next-intl'

const copy = {
  en: {
    heading: 'Coming Soon',
    subheading: 'Our writer is still staring at a blank page. We believe in them.',
  },
  es: {
    heading: 'Próximamente',
    subheading: 'Nuestro escritor sigue mirando una página en blanco. Confiamos en él.',
  },
} as const

export default function BlogComingSoon({ hideWrapper }: { hideWrapper?: boolean }) {
  const locale = useLocale()
  const t = copy[locale as keyof typeof copy] ?? copy.en
  const cursorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return
    let visible = true
    const interval = setInterval(() => {
      visible = !visible
      el.style.opacity = visible ? '1' : '0'
    }, 600)
    return () => clearInterval(interval)
  }, [])

  const content = (
    <>
      <p className="font-body font-medium text-[4.4rem] md:text-[3.32rem] leading-[1.042] text-white whitespace-nowrap">
        {t.heading}<span ref={cursorRef} className="text-white">_</span>
      </p>
      <p className="font-body font-medium text-[1.5rem] leading-[1.5] text-[var(--color-muted)] mt-[3rem]">
        {t.subheading}
      </p>
    </>
  )

  if (hideWrapper) {
    return <div className="flex flex-col items-center justify-center pt-[8rem] pb-[24rem]">{content}</div>
  }

  return (
    <main data-nav-theme="dark" className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
      {content}
    </main>
  )
}
