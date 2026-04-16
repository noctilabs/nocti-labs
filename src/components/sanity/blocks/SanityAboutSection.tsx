import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { PAGE_QUERY_RESULT } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERY_RESULT>['pageBuilder']>[number]
type SanityAboutSectionProps = Extract<PageBlock, { _type: 'aboutSection' }>

export default function SanityAboutSection({
  heading,
  description,
  image,
}: SanityAboutSectionProps) {
  return (
    <section
      data-nav-theme="dark"
      className="bg-black text-white relative"
    >
      <div className="px-[2.38vw] md:px-section-x pt-[7vw] md:pt-[2.34rem] pb-[2rem]">
        {/* Heading — mobile: 11.43vw (48px at 420px frame), desktop: 3.32rem */}
        {heading && (
          <h1 className="text-[11.43vw] leading-[11.9vw] font-body font-medium m-0 md:text-[3.32rem] md:leading-[1.042]">
            {heading}
          </h1>
        )}

        {/* Description — mobile: sentence-per-line with gaps, desktop: bodyLarge single block */}
        {description && (
          <>
            {/* Mobile: split into sentences, each on its own line */}
            <div className="mt-[6.19vw] mb-[13.21vw] flex flex-col gap-[5.95vw] md:hidden">
              {description
                .split(/(?<=[.!?])\s+/)
                .filter(Boolean)
                .map((sentence, i) => (
                  <p key={i} className="text-[5.71vw] leading-[5.95vw] font-body font-medium m-0">
                    {sentence}
                  </p>
                ))}
            </div>
            {/* Desktop: single block */}
            <p className="hidden md:block text-[2.21rem] leading-[1.156] font-body font-medium mt-[3.94rem] mb-[5.54rem] max-w-[94.44rem]">
              {description}
            </p>
          </>
        )}
      </div>

      {/* Full-width Image */}
      {image?.asset?._ref && (
        <div className="px-section-x pb-[1.385rem]">
          <div className="w-full h-[26.64rem] relative rounded-[3px] overflow-hidden">
            <Image
              src={urlFor(image).width(1440).url()}
              alt={heading ?? ''}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}
    </section>
  )
}
