'use client'

import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import SanityCta from '@/components/sanity/shared/SanityCta'
import type { PAGE_QUERYResult } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>[number]
type SanityIntroSectionProps = Extract<PageBlock, { _type: 'introSection' }>

/** Horizontal inset matching PersistentNav (clamp(20px, 3vw, 40px)) for flush alignment on resize. */
const SECTION_INSET = 'clamp(20px, 3vw, 40px)';

/** Fluid type scales with viewport (min, preferred vw, max). */
const HEADING_FONT_SIZE = 'clamp(28px, 4vw, 48px)';
const DESCRIPTION_FONT_SIZE = 'clamp(18px, 2.5vw, 32px)';
const BADGE_FONT_SIZE = 'clamp(12px, 1.25vw, 16px)';

export default function SanityIntroSection({
  heading,
  image,
  description,
  badge,
  cta,
}: SanityIntroSectionProps) {
  return (
    <section
      data-nav-theme="dark"
      className="bg-black text-white relative py-20 min-h-screen flex flex-col justify-center"
      style={{
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        marginLeft: '30px',
        marginRight: '30px',
      }}
    >
      {/* Heading - Top Left (aligned with header inset via section margin) */}
      {heading && (
        <div className="max-w-3xl mb-12" style={{ marginTop: '100px', marginBottom: '50px' }}>
          <h2 className="font-body font-bold leading-tight" style={{ marginTop: 0, marginBottom: 0, fontSize: HEADING_FONT_SIZE }}>
            {heading}
          </h2>
        </div>
      )}

      {/* Badge - Top Right (same inset as header) */}
      {badge && (
        <div className="absolute top-20 flex items-center gap-3" style={{ right: SECTION_INSET }}>
          {badge.image?.asset?._ref && (
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white flex items-center justify-center relative">
              <Image
                src={urlFor(badge.image).width(48).height(48).url()}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          )}
          {badge.text && (
            <span className="font-body text-white" style={{ fontSize: BADGE_FONT_SIZE }}>
              {badge.text}
            </span>
          )}
        </div>
      )}

      {/* Image - Center (aligned via section margin) */}
      <div>
        {image?.asset?._ref ? (
          <Image
            src={urlFor(image).width(1400).url()}
            alt=""
            width={1400}
            height={787}
            className="w-full aspect-video object-cover rounded-lg mb-16 my-12"
          />
        ) : (
          <div className="w-full h-[400px] aspect-video bg-gray-800 rounded-lg mb-16 my-12" />
        )}
      </div>

      {/* Description - Below Image (aligned via section margin) */}
      {description && (
        <div className="pb-[30px]">
          <p className="font-body leading-relaxed max-w-[1036px] mb-8 pl-0 pr-10 pt-10 pb-5" style={{ fontSize: DESCRIPTION_FONT_SIZE, marginRight: 0 }}>
            {description}
          </p>
        </div>
      )}

      {/* CTA - Bottom Right */}
      {cta && (
        <div className="mt-12 flex justify-end">
          <SanityCta {...cta} className="text-white" />
        </div>
      )}
    </section>
  )
}
