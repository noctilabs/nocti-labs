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
      className="bg-black text-white relative py-20 flex flex-col justify-start px-[3rem] pt-0 ml-0 mr-0 mb-0"
    >
      {/* Heading - Top Left */}
      {heading && (
        <div className="mt-[50px] mb-[40px] max-w-[38.55rem] w-full">
          <h2 className="m-0 text-[3.32rem] font-body font-medium not-italic leading-[1.042] tracking-[0]">
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
        <div className="pb-[20px] max-w-[94.42%]">
          <p className="text-[2.21rem] font-body font-medium not-italic leading-[1.156] tracking-[0] pt-[40px] pb-[20px] m-0">
            {description}
          </p>
        </div>
      )}

      {/* CTA - Bottom Right */}
      {cta && (
        <div className="flex justify-end pt-[20px] pb-[40px] font-medium leading-[1.042]">
          <SanityCta {...cta} className="text-white" />
        </div>
      )}
    </section>
  )
}
