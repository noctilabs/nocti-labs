'use client'

import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import SanityCta from '@/components/sanity/shared/SanityCta'
import { heading as headingCls, bodyLarge } from '@/lib/typography'
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
      className="bg-black text-white relative flex flex-col justify-start px-section-x pb-20"
    >
      {/* Heading - Top Left */}
      {heading && (
        <div className="mt-[3.125rem] mb-[2.5rem] max-w-[38.55rem] w-full">
          <h2 className={`${headingCls} m-0`}>
            {heading}
          </h2>
        </div>
      )}

      {/* Badge - Top Right */}
      {badge && (
        <div className="absolute top-20 flex items-center gap-3 right-[3rem]">
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

      {/* Image - Center */}
      {image?.asset?._ref && (
        <div className="mb-[30px]">
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
        <div className="pb-[1.25rem] max-w-[94.42%]">
          <p className={`${bodyLarge} pt-[2.5rem] pb-[1.25rem] m-0`}>
            {description}
          </p>
        </div>
      )}

      {/* CTA - Bottom Right */}
      {cta && (
        <div className="flex justify-end pt-[1.25rem] pb-[2.5rem] font-medium leading-[1.042]">
          <SanityCta {...cta} className="text-white text-[1.66rem]" />
        </div>
      )}
    </section>
  )
}
