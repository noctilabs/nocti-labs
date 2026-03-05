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
          paddingLeft: 'clamp(20px, 2.77vw, 100vw)',
          paddingRight: 'clamp(20px, 2.77vw, 100vw)',
          paddingTop: 'clamp(40px, 4.74vw, 100vw)',
        }}
      >
        {/* Heading */}
        {heading && (
          <h1
            style={{
              fontSize: 'clamp(28px, 3.32vw, 100vw)',
              fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 500,
              fontStyle: 'normal',
              lineHeight: '1.042',
              letterSpacing: '0',
              marginBottom: 'clamp(20px, 3.94vw, 100vw)',
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
              fontSize: 'clamp(18px, 2.21vw, 100vw)',
              fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 500,
              fontStyle: 'normal',
              lineHeight: '1.156',
              letterSpacing: '0',
              color: 'white',
              maxWidth: 'clamp(300px, 94.44vw, 100vw)',
              marginBottom: 'clamp(40px, 5.54vw, 100vw)',
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
            paddingLeft: 'clamp(20px, 2.77vw, 100vw)',
            paddingRight: 'clamp(20px, 2.77vw, 100vw)',
            paddingBottom: 'clamp(10px, 1.385vw, 100vw)',
          }}
        >
        <div
          style={{
            width: '100%',
            height: 'clamp(200px, 26.64vw, 100vw)',
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
