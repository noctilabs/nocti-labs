import ContactForm from './ContactForm'
import { heading as titleClass, subheading as ctaClass } from '@/lib/typography'
import type { PAGE_QUERYResult } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>[number]
type SanityContactSectionProps = Extract<PageBlock, { _type: 'contactSection' }>

export default function SanityContactSection({
  heading,
  email,
  offices,
  formHeading,
}: SanityContactSectionProps) {
  return (
    <section
      data-nav-theme="dark"
      className="bg-black text-white pt-[9.48rem] pb-[8.34rem] pl-section-x pr-[10.73rem]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[673fr_442fr] gap-[9.34rem]">

        {/* LEFT COLUMN */}
        <div>
          {/* "Lets talk!" + email — side by side */}
          <div className="flex items-start gap-[1.38rem]">
            {heading && (
              <h2 className={`${titleClass} flex-1 m-0`}>
                {heading}
              </h2>
            )}
            {email && (
              <p className={`${ctaClass} flex-1 m-0 pt-[1.59rem] text-white`}>
                {email}
              </p>
            )}
          </div>

          {/* "Our Offices" + addresses — side by side */}
          <div className="grid grid-cols-2 gap-[1.38rem] mt-[18.75rem]">
            <h3 className={titleClass}>
              Our Offices
            </h3>
            <div className="pt-[1.63rem] w-[22.7rem]">
              {offices && offices.map((office, index) => {
                const locationLine = [office.city, office.state, office.country].filter(Boolean).join(', ');
                const hasAddressParts = office.address || office.stateAbbr || office.zip;
                const addressLine = hasAddressParts
                  ? [office.address, office.city && (office.stateAbbr || office.zip) ? `${office.city}, ${[office.stateAbbr, office.zip].filter(Boolean).join(' ')}` : null].filter(Boolean).join(', ')
                  : '';
                return (
                  <div
                    key={office._key}
                    className={index > 0 ? 'mt-[1.73rem]' : ''}
                  >
                    <p className={`${ctaClass} text-white`}>
                      {locationLine}
                      {addressLine && (
                        <>
                          <br />
                          {addressLine}
                        </>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — form */}
        <div>
          {formHeading && (
            <h2 className={`${titleClass} pb-[1.58rem]`}>
              {formHeading}
            </h2>
          )}
          <ContactForm />
        </div>

      </div>
    </section>
  )
}
