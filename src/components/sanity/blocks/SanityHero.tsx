import { stegaClean } from 'next-sanity'
import { BackgroundGradientAnimation } from '@/components/ui/BackgroundGradientAnimation'
import { urlFor } from '@/sanity/lib/image'
import type { PAGE_QUERY_RESULT } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERY_RESULT>['pageBuilder']>[number]
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

  // Background must stay inline due to dynamic URL/theme logic
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

  // Inner panel background must stay inline due to dynamic URL
  const innerBgStyle: React.CSSProperties = {
    backgroundImage: innerBgImageUrl
      ? `url(${innerBgImageUrl})`
      : !bgImageUrl && cleanTheme === 'blue'
        ? 'url(/noctiLabsBackgroundInnerLanding.svg)'
        : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  // Only explicit "light" (white) hero uses dark nav; blue and other dark treatments use light nav + locale.
  const navTheme: 'light' | 'dark' = cleanTheme === 'light' ? 'light' : 'dark'
  // Blue hero — logo is white (dark theme) to contrast against the blue background
  const navLogoTheme: 'light' | 'dark' | undefined = cleanTheme === 'blue' ? 'dark' : undefined

  return (
    <section
      data-nav-theme={navTheme}
      {...(navLogoTheme ? { 'data-nav-logo-theme': navLogoTheme } : {})}
      className="w-full h-screen relative overflow-hidden mt-[calc(-1*var(--nav-offset))]"
      style={bgStyle}
    >
      {cleanTheme === 'blue' && (
        <div className="absolute inset-0 opacity-60" style={{ mixBlendMode: 'screen' }}>
          <BackgroundGradientAnimation
            className="absolute inset-0 w-full h-full"
            interactive={true}
          />
        </div>
      )}

      {/* Inner headline panel */}
      <div
        className="absolute flex items-center justify-center
          left-[14px] right-[14px] top-[243px] h-[385px]
          md:left-[18.96%] md:right-auto md:w-[62.56%] md:h-auto md:aspect-[903/385] md:top-[25.60%]"
        style={innerBgStyle}
      >
        <p
          className={`${textColor} text-[32px] leading-[37px] md:text-[3rem] md:leading-[3.125rem] font-body font-medium not-italic tracking-[0] text-center antialiased text-crisp m-0 p-0 w-[calc(100%-2rem)] md:w-[74.5%] whitespace-pre-line`}
        >
          {heading || 'Commerce and Technology Studio for the AI era'}
        </p>
      </div>
    </section>
  )
}
