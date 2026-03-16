import { stegaClean } from 'next-sanity'
import { createDataAttribute } from '@sanity/visual-editing'
import { urlFor } from '@/sanity/lib/image'
import type { PAGE_QUERYResult } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>[number]
type SanityHeroProps = Extract<PageBlock, { _type: 'hero' }> & {
  documentId?: string
}

export default function SanityHero({
  heading,
  backgroundImage,
  theme,
  innerBackgroundImage,
  _key,
  documentId,
}: SanityHeroProps) {
  const attr = (path: string) =>
    documentId
      ? { 'data-sanity': createDataAttribute({ id: documentId, type: 'page', path: `pageBuilder[_key=="${_key}"].${path}` }).toString() }
      : {}
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

  return (
    <section
      data-nav-theme="dark"
      className="w-full h-screen relative overflow-hidden mt-[calc(-1*var(--nav-offset))]"
      style={bgStyle}
    >
      {/* Inner headline panel */}
      <div
        className="w-[62.56%] aspect-[903/385] left-[18.96%] top-[25.60%] absolute flex items-center justify-center"
        style={innerBgStyle}
      >
        <p
          className={`${textColor} w-[74.5%] text-[3rem] font-body font-medium not-italic leading-[3.125rem] tracking-[0] text-center antialiased text-crisp m-0 p-0`}
          {...attr('heading')}
        >
          {heading || 'Commerce and Technology Studio for the AI era'}
        </p>
      </div>
    </section>
  )
}
