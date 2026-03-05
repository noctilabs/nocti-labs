import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { heading as headingCls, bodyLarge } from '@/lib/typography'
import type { PAGE_QUERYResult } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>[number]
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
      <div className="px-section-x pt-[4.74rem]">
        {/* Heading */}
        {heading && (
          <h1 className={`${headingCls} mb-[3.94rem]`}>
            {heading}
          </h1>
        )}

        {/* Description */}
        {description && (
          <p className={`${bodyLarge} max-w-[94.44rem] mb-[5.54rem]`}>
            {description}
          </p>
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
