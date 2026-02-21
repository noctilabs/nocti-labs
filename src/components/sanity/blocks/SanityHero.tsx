import { stegaClean } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'
import type { PAGE_QUERYResult } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>[number]
type SanityHeroProps = Extract<PageBlock, { _type: 'hero' }>

export default function SanityHero({
  heading,
  backgroundImage,
  theme,
}: SanityHeroProps) {
  const cleanTheme = stegaClean(theme) || 'blue'

  const hasCustomBg = backgroundImage?.asset?._ref
  const bgImageUrl = hasCustomBg
    ? urlFor(backgroundImage).width(1920).url()
    : undefined

  // Fallback to existing SVG backgrounds for "blue" theme
  const bgStyle: React.CSSProperties = bgImageUrl
    ? {
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : cleanTheme === 'blue'
      ? {
          backgroundImage: 'url(/noctiLabsBackgroundLanding.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      : {
          backgroundColor: cleanTheme === 'light' ? '#ffffff' : '#000000',
        }

  const textColor = cleanTheme === 'light' ? 'text-black' : 'text-white'

  return (
    <section
      data-nav-theme="dark"
      style={{
        width: '100%',
        aspectRatio: '1445 / 789',
        position: 'relative',
        overflow: 'hidden',
        ...bgStyle,
      }}
    >
      {/* Inner headline panel */}
      <div
        style={{
          width: '62.56%',
          aspectRatio: '903 / 385',
          left: '18.96%',
          top: '25.60%',
          position: 'absolute',
          backgroundImage:
            !bgImageUrl && cleanTheme === 'blue'
              ? 'url(/noctiLabsBackgroundInnerLanding.svg)'
              : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p
          className={textColor}
          style={{
            width: '74.5%',
            fontSize: 'clamp(24px, 3.32vw, 48px)',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            lineHeight: 1.04,
            textAlign: 'center',
          }}
        >
          {heading || 'Commerce and Technology Studio for the AI era'}
        </p>
      </div>

    </section>
  )
}
