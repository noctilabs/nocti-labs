"use client"

import { motion } from 'framer-motion'

export function FadeIn({ children, className, style }: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.1 }}
    >
      {children}
    </motion.div>
  )
}
