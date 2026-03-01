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
          paddingLeft: 'clamp(20px, 3vw, 40px)',
          paddingRight: 'clamp(20px, 3vw, 40px)',
          paddingTop: 'clamp(40px, 5vw, 80px)',
        }}
      >
        {/* Heading */}
        {heading && (
          <h1
            style={{
              fontSize: 'clamp(32px, 3.3vw, 48px)',
              fontFamily: '"Neue Haas Unica Pro", system-ui, sans-serif',
              fontWeight: '500',
              lineHeight: '50px',
              marginBottom: 'clamp(20px, 2.4vw, 35px)',
            }}
          >
            {heading}
          </h1>
        )}

        {/* Description */}
        {description && (
          <p
            style={{
              fontSize: 'clamp(20px, 2.2vw, 32px)',
              fontFamily: '"Neue Haas Unica Pro", system-ui, sans-serif',
              fontWeight: '500',
              lineHeight: 'clamp(28px, 2.6vw, 37px)',
              color: 'white',
              maxWidth: '100%',
              marginBottom: 'clamp(40px, 5vw, 80px)',
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
            paddingLeft: 'clamp(20px, 3vw, 40px)',
            paddingRight: 'clamp(20px, 3vw, 40px)',
            paddingBottom: 'clamp(40px, 5vw, 80px)',
          }}
        >
        <div
          style={{
            width: '100%',
            height: 'clamp(200px, 26.7vw, 385px)',
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
