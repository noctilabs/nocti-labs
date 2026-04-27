"use client"

import { motion } from 'framer-motion'
import { BubbleBackground } from '@/components/ui/BubbleBackground'

export function BubbleBackgroundFadeIn() {
  return (
    <motion.div
      className="absolute inset-0"
      style={{ mixBlendMode: 'screen' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.1 }}
    >
      <BubbleBackground
        className="absolute inset-0 w-full h-full"
        interactive={true}
      />
    </motion.div>
  )
}
