import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
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
      <div
        style={{
          paddingLeft: '2.77rem',
          paddingRight: '2.77rem',
          paddingTop: '4.74rem',
        }}
      >
        {/* Heading */}
        {heading && (
          <h1
            style={{
              fontSize: '3.32rem',
              fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 500,
              fontStyle: 'normal',
              lineHeight: '1.042',
              letterSpacing: '0',
              marginBottom: '3.94rem',
              color: 'white',
            }}
          >
            {heading}
          </h1>
        )}

        {/* Description */}
        {description && (
          <p
            style={{
              fontSize: '2.21rem',
              fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 500,
              fontStyle: 'normal',
              lineHeight: '1.156',
              letterSpacing: '0',
              color: 'white',
              maxWidth: '94.44rem',
              marginBottom: '5.54rem',
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Full-width Image */}
      {image?.asset?._ref && (
        <div
          style={{
            paddingLeft: '2.77rem',
            paddingRight: '2.77rem',
            paddingBottom: '1.385rem',
          }}
        >
        <div
          style={{
            width: '100%',
            height: '26.64rem',
            position: 'relative',
            borderRadius: '3px',
            overflow: 'hidden',
          }}
        >
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
