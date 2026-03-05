import Link from 'next/link'
import { stegaClean } from 'next-sanity'

interface SanityCtaProps {
  label?: string
  linkType?: string
  internalLink?: string
  externalUrl?: string
  className?: string
}

export default function SanityCta({
  label,
  linkType,
  internalLink,
  externalUrl,
  className = '',
}: SanityCtaProps) {
  if (!label) return null

  const cleanLinkType = stegaClean(linkType)
  const href =
    cleanLinkType === 'external' ? externalUrl : internalLink || '#'

  if (!href) return null

  const isExternal = cleanLinkType === 'external'

  return (
    <Link
      href={href}
      className={`hover:opacity-70 transition inline-flex items-center gap-2 ${className}`}
      style={{
        fontSize: 'clamp(16px, 1.66vw, 100vw)',
        fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
        fontWeight: 'inherit',
        fontStyle: 'normal',
        lineHeight: 'inherit',
        letterSpacing: '0',
      }}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {label} <span aria-hidden="true">&rarr;</span>
    </Link>
  )
}
