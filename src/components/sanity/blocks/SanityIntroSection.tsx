import { urlFor } from '@/sanity/lib/image'
import SanityCta from '@/components/sanity/shared/SanityCta'

interface SanityIntroSectionProps {
  _key: string
  heading?: string
  image?: { asset?: { _ref: string } }
  description?: string
  badge?: {
    image?: { asset?: { _ref: string } }
    text?: string
  }
  cta?: {
    label?: string
    linkType?: string
    internalLink?: string
    externalUrl?: string
  }
}

export default function SanityIntroSection({
  heading,
  image,
  description,
  badge,
  cta,
}: SanityIntroSectionProps) {
  return (
    <section className="bg-white text-black py-20 px-8 md:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Image */}
        <div>
          {image?.asset?._ref ? (
            <img
              src={urlFor(image).width(800).url()}
              alt=""
              className="w-full rounded-lg"
            />
          ) : (
            <div className="w-full aspect-square bg-gray-200 rounded-lg" />
          )}
        </div>

        {/* Right: Content */}
        <div>
          {heading && (
            <h2 className="font-body text-[40px] md:text-[48px] font-bold mb-8 leading-tight">
              {heading}
            </h2>
          )}

          {description && (
            <p className="font-body text-[18px] text-black opacity-70 mb-8 leading-relaxed">
              {description}
            </p>
          )}

          {badge && (
            <div className="flex items-center gap-4 mb-8">
              {badge.image?.asset?._ref && (
                <img
                  src={urlFor(badge.image).width(80).height(80).url()}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
              )}
              {badge.text && (
                <span className="font-mono text-[14px] uppercase font-semibold">
                  {badge.text}
                </span>
              )}
            </div>
          )}

          {cta && <SanityCta {...cta} className="text-black" />}
        </div>
      </div>
    </section>
  )
}
