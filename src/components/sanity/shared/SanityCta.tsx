import Link from 'next/link'
import { stegaClean } from 'next-sanity'

interface SanityCtaProps {
  label?: string
  linkType?: string
  internalLink?: string
  externalUrl?: string
  className?: string
  showArrow?: boolean
}

export default function SanityCta({
  label,
  linkType,
  internalLink,
  externalUrl,
  className = '',
  showArrow = true,
}: SanityCtaProps) {
  const cleanLabel = label ? stegaClean(label).trim() : ''
  if (!cleanLabel) return null

  const cleanLinkType = stegaClean(linkType)
  const href =
    cleanLinkType === 'external' ? externalUrl : internalLink || '#'

  if (!href) return null

  const isExternal = cleanLinkType === 'external'

  return (
    <Link
      href={href}
      className={`hover:opacity-70 transition inline-flex items-center gap-2 font-body font-[inherit] leading-[inherit] ${className}`}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {cleanLabel} {showArrow && <span aria-hidden="true">&rarr;</span>}
    </Link>
  )
}
