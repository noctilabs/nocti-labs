'use client'

import { useEffect, useRef } from 'react'

export default function BlogComingSoon({ hideWrapper }: { hideWrapper?: boolean }) {
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
      <p className="font-display font-medium text-[9.6vw] leading-none tracking-[-0.02em] text-white whitespace-nowrap">
        Coming Soon<span ref={cursorRef} className="text-white">_</span>
      </p>
      <p className="font-body font-medium text-[1.5rem] leading-[1.5] text-[var(--color-muted)] mt-[3rem]">
        Our writer is still staring at a blank page. We believe in them.
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
