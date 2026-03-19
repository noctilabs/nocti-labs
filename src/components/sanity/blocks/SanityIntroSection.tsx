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
      className="bg-black text-white relative flex flex-col
                 px-[1rem] pb-[3.4rem]
                 md:px-section-x md:pb-20"
    >
      {/* Top: Heading + Badge */}
      <div className="flex flex-col md:block">
        {/* Heading */}
        {heading && (
          <div className="mt-[4.5rem] mb-0 md:mt-[3.125rem] md:mb-[2.5rem] max-w-[38.55rem] w-full">
            <h2 className={`${headingCls} m-0
                            text-[4.4rem] leading-[4.6rem]
                            md:text-[3.32rem] md:leading-[1.042]`}>
              {heading}
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

      {/* Image - hidden on mobile, shown on desktop */}
      {image?.asset?._ref && (
        <div className="hidden md:block mb-[30px]">
          <Image
            src={urlFor(image).width(1400).url()}
            alt=""
            width={1400}
            height={787}
            className="w-full aspect-video object-cover rounded-lg mb-16 my-12"
          />
        </div>
      )}

      {/* Bottom: Description + CTA */}
      <div className="pt-[34.9rem] md:pt-0">
        {/* Description */}
        {description && (
          <div className="max-w-[94.42%] md:pb-[1.25rem]">
            {/* Mobile: each newline-separated sentence on its own line */}
            <div className={`${bodyLarge} md:hidden
                             text-[3.2rem] leading-[3.7rem]`}>
              {description.split('\n').filter(Boolean).map((line, i) => (
                <p key={i} className="m-0 mb-[3.7rem] last:mb-0">{line}</p>
              ))}
            </div>
            {/* Desktop: single paragraph */}
            <p className={`${bodyLarge} hidden md:block
                           md:pt-[2.5rem] md:pb-[1.25rem] m-0`}>
              {description}
            </p>
          </div>
        )}

        {/* CTA - desktop only */}
        {cta && (
          <div className="hidden md:flex justify-end pt-[1.25rem] pb-[2.5rem] md:pb-0 font-medium leading-[1.042]">
            <SanityCta {...cta} className="text-white text-[1.66rem]" />
          </div>
        )}
      </div>
    </section>
  )
}
