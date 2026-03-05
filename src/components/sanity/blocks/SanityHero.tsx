import { stegaClean } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'
import type { PAGE_QUERYResult } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>[number]
type SanityHeroProps = Extract<PageBlock, { _type: 'hero' }>

export default function SanityHero({
  heading,
  backgroundImage,
  theme,
  innerBackgroundImage,
}: SanityHeroProps) {
  const cleanTheme = stegaClean(theme) || 'blue'

  const hasCustomBg = backgroundImage?.asset?._ref
  const bgImageUrl = hasCustomBg
    ? urlFor(backgroundImage).width(1920).url()
    : undefined

  const hasCustomInnerBg = innerBackgroundImage?.asset?._ref
  const innerBgImageUrl = hasCustomInnerBg
    ? urlFor(innerBackgroundImage).width(1920).url()
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
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        marginTop: 'calc(-1 * var(--nav-offset))',
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
          backgroundImage: innerBgImageUrl
            ? `url(${innerBgImageUrl})`
            : !bgImageUrl && cleanTheme === 'blue'
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
            fontSize: '3.32rem',
            fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 500,
            fontStyle: 'normal',
            fontSynthesis: 'none',
            lineHeight: '1.042',
            letterSpacing: '0',
            textAlign: 'center',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            fontFeatureSettings: 'normal',
            textRendering: 'optimizeLegibility',
            margin: 0,
            padding: 0,
          }}
        >
          {heading || 'Commerce and Technology Studio for the AI era'}
        </p>
      </div>

    </section>
  )
}
