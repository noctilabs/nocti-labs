import { stegaClean } from 'next-sanity'
import SanityCta from '@/components/sanity/shared/SanityCta'
import type { PAGE_QUERYResult } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>[number]
type SanityServicesShowcaseProps = Extract<PageBlock, { _type: 'servicesShowcase' }>

export default function SanityServicesShowcase({
  heading,
  services,
  cta,
}: SanityServicesShowcaseProps) {
  return (
    <section data-nav-theme="light" className="bg-white text-black py-20 px-8 md:px-16">
      {heading && (
        <h2 className="font-body text-[40px] font-bold mb-16">{heading}</h2>
      )}

      {services && services.length > 0 && (
        <div className="space-y-px">
          {services.map((service) => {
            const category = stegaClean(service.category)
            return (
              <div key={service._id}>
                <div className="py-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[48px] md:text-[53px] font-body font-bold hover:opacity-70 transition cursor-pointer">
                      {service.title}
                    </span>
                    {category && (
                      <span className="font-mono text-[12px] uppercase text-muted">
                        {category}
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-px bg-black opacity-20" />
              </div>
            )
          })}
        </div>
      )}

      {cta && (
        <div className="mt-16 pt-8 border-t border-black border-opacity-20">
          <SanityCta {...cta} className="text-black" />
        </div>
      )}
    </section>
  )
}
