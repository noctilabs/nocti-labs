import { stegaClean } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'
import type { PAGE_QUERYResult } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>[number]
type SanityHeroProps = Extract<PageBlock, { _type: 'hero' }>

export default function SanityHero({
  heading,
  backgroundImage,
  theme,
  ...props
}: SanityHeroProps & { innerBackgroundImage?: any }) {
  const innerBackgroundImage = (props as any).innerBackgroundImage
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
        aspectRatio: '1445 / 789',
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
            fontSize: 'clamp(24px, 3.32vw, 48px)',
            fontFamily: '"Neue Haas Unica Pro", "Neue Haas Unica Pro Medium", "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 500,
            fontStyle: 'normal',
            fontSynthesis: 'none',
            lineHeight: 'clamp(25px, 3.47vw, 50px)',
            letterSpacing: '0',
            textAlign: 'center',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            fontFeatureSettings: 'normal',
            textRendering: 'optimizeLegibility',
          }}
        >
          {heading || 'Commerce and Technology Studio for the AI era'}
        </p>
      </div>

    </section>
  )
}
