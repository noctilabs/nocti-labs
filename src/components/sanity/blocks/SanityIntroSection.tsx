'use client'

import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import SanityCta from '@/components/sanity/shared/SanityCta'
import type { PAGE_QUERYResult } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>[number]
type SanityIntroSectionProps = Extract<PageBlock, { _type: 'introSection' }>

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
      style={{ paddingLeft: 'clamp(20px, 3vw, 40px)', paddingTop: '0px' }}
    >
      {/* Heading - Top Left (aligned with header padding) */}
      {heading && (
        <div className="max-w-3xl mb-12 px-10 md:px-16" style={{ marginTop: '140px', marginBottom: '50px' }}>
          <h2 className="font-body text-[48px] font-bold leading-tight" style={{ marginTop: '0px', marginBottom: '0px' }}>
            {heading}
          </h2>
        </div>
      )}

      {/* Badge - Top Right */}
      {badge && (
        <div className="absolute top-20 right-8 md:right-16 flex items-center gap-3">
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
            <span className="font-body text-[16px] text-white">
              {badge.text}
            </span>
          )}
        </div>
      )}

      {/* Image - Center */}
      <div className="px-10 md:px-16">
        {image?.asset?._ref ? (
          <Image
            src={urlFor(image).width(1400).url()}
            alt=""
            width={1400}
            height={787}
            className="w-full aspect-video object-cover rounded-lg mb-16 my-12"
          />
        ) : (
          <div className="w-full aspect-video bg-gray-800 rounded-lg mb-16 my-12" />
        )}
      </div>

      {/* Description - Below Image */}
      {description && (
        <div className="px-10 md:px-16">
          <p className="font-body text-[24px] md:text-[32px] leading-relaxed max-w-4xl mb-8">
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
