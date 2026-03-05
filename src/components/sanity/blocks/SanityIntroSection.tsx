'use client'

import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import SanityCta from '@/components/sanity/shared/SanityCta'
import type { PAGE_QUERYResult } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>[number]
type SanityIntroSectionProps = Extract<PageBlock, { _type: 'introSection' }>

/** Horizontal inset matching PersistentNav (clamp(20px, 3vw, 40px)) for flush alignment on resize. */
const SECTION_INSET = 'clamp(20px, 3vw, 40px)';

/** Fluid type scales proportionally with viewport, matching Figma ratios at 1445px. */
const HEADING_FONT_SIZE = 'clamp(28px, 3.32vw, 100vw)';
const HEADING_LINE_HEIGHT = '1.042';
const DESCRIPTION_FONT_SIZE = 'clamp(18px, 2.21vw, 100vw)';
const DESCRIPTION_LINE_HEIGHT = '1.156';
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
      className="bg-black text-white relative py-20 flex flex-col justify-start"
      style={{
        paddingLeft: SECTION_INSET,
        paddingRight: SECTION_INSET,
        paddingTop: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
      }}
    >
      {/* Heading - Top Left (aligned with header inset via section margin) */}
      {heading && (
        <div
          style={{ marginTop: '50px', marginBottom: '40px', width: 'clamp(325px, 38.55vw, 100vw)' }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: 0,
              fontSize: HEADING_FONT_SIZE,
              fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 500,
              fontStyle: 'normal',
              lineHeight: HEADING_LINE_HEIGHT,
              letterSpacing: '0',
            }}
          >
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
      {image?.asset?._ref && (
        <div style={{ marginBottom: '30px' }}>
          <Image
            src={urlFor(image).width(1400).url()}
            alt=""
            width={1400}
            height={787}
            className="w-full aspect-video object-cover rounded-lg mb-16 my-12"
          />
        </div>
      )}

      {/* Description - Below Image */}
      {description && (
        <div style={{ paddingBottom: '20px', maxWidth: '94.42%' }}>
          <p
            style={{
              fontSize: DESCRIPTION_FONT_SIZE,
              fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 500,
              fontStyle: 'normal',
              lineHeight: DESCRIPTION_LINE_HEIGHT,
              letterSpacing: '0',
              paddingTop: '40px',
              paddingBottom: '20px',
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>
      )}

      {/* CTA - Bottom Right */}
      {cta && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '20px', paddingBottom: '40px', fontWeight: 500, lineHeight: '1.042' }}>
          <SanityCta {...cta} className="text-white" />
        </div>
      )}
    </section>
  )
}
