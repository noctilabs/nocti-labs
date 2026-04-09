'use client'

import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import SanityCta from '@/components/sanity/shared/SanityCta'
import { heading as headingCls, bodyLarge } from '@/lib/typography'
import type { PAGE_QUERY_RESULT } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERY_RESULT>['pageBuilder']>[number]
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
      className="bg-black text-white relative flex flex-col min-h-screen
                 px-[1rem]
                 md:px-section-x"
    >
      {/* Top: Heading + Badge */}
      <div className="flex flex-col md:block">
        {/* Heading */}
        {heading && (
          <div className="mt-[4.5rem] mb-0 md:mt-[3.125rem] md:mb-[2.5rem] max-w-[38.55rem] w-full md:max-w-none">
            <h2 className={`${headingCls} m-0
                            text-[4.4rem] leading-[4.6rem]
                            md:text-[3.32rem] md:leading-[1.042]`}>
              {Array.isArray(heading)
                ? heading.map((block) => block.children?.map((c) => c.text).join('') ?? '').join('\n')
                : heading}
            </h2>
          </div>
        )}

        {/* Badge - hidden on mobile per Figma */}
        {badge && (
          <div className="hidden md:flex absolute top-20 items-center gap-3 right-[3rem]">
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
              <span className="font-body text-white text-[1.25rem]">
                {badge.text}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Image - always reserves space; shown when asset is set */}
      <div className="w-full" style={{ aspectRatio: '1365/534' }}>
        {image?.asset?._ref && (
          <Image
            src={urlFor(image).width(1400).url()}
            alt=""
            width={1400}
            height={534}
            className="w-full h-full object-cover rounded-[3px]"
          />
        )}
      </div>

      {/* Bottom: Description + CTA */}
      <div className="mt-auto pt-[2.625rem] pb-[9.5rem] flex flex-row items-start justify-between">
        {description && (
          <div className={`font-body font-medium m-0
                           text-[3.2rem] leading-[3.7rem]
                           md:text-[2rem] md:leading-[2.3125rem] md:max-w-[74.6%]`}>
            {Array.isArray(description)
              ? description.map((block) => (
                  <p key={block._key} className="m-0">
                    {block.children?.map((c) => c.text).join('') ?? ''}
                  </p>
                ))
              : description}
          </div>
        )}

        {cta && (
          <div className="flex-shrink-0">
            <SanityCta {...cta} className="text-white text-[1.5rem] leading-[1.5625rem] font-medium" />
          </div>
        )}
      </div>
    </section>
  )
}
