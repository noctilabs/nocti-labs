"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BubbleBackground } from '@/components/ui/BubbleBackground'

const SESSION_KEY = 'nocti_hero_seen'

export function BubbleBackgroundFadeIn() {
  const [ready, setReady] = useState<'first' | 'returning' | null>(null)

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(SESSION_KEY) === '1'
    sessionStorage.setItem(SESSION_KEY, '1')
    setReady(alreadySeen ? 'returning' : 'first') // eslint-disable-line react-hooks/set-state-in-effect
  }, [])

  if (ready === null) return null

  return (
    <motion.div
      className="absolute inset-0"
      style={{ mixBlendMode: 'screen' }}
      initial={{ opacity: ready === 'returning' ? 0.6 : 0 }}
      animate={{ opacity: 0.6 }}
      transition={ready === 'returning' ? { duration: 0 } : { duration: 2, ease: [0.5, 0, 0.75, 0], delay: 0.6 }}
    >
      <BubbleBackground
        className="absolute inset-0 w-full h-full"
        interactive={true}
      />
    </motion.div>
  )
}
