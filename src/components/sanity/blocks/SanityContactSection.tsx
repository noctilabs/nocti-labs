import ContactForm from './ContactForm'
import { contactTitle, contactCta } from '@/lib/typography'
import type { PAGE_QUERYResult } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>[number]
type SanityContactSectionProps = Extract<PageBlock, { _type: 'contactSection' }>

export default function SanityContactSection({
  heading,
  email,
  offices,
  formHeading,
  ecommercePlatforms,
  hearAboutUsOptions,
}: SanityContactSectionProps) {
  return (
    <section
      data-nav-theme="dark"
      className="bg-black text-white pt-[2.34rem] pb-[8.34rem] pl-section-x pr-[10.73rem] scroll-mt-[7rem]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[673fr_442fr] gap-[9.34rem]">

        {/* LEFT COLUMN — stacked per Figma */}
        <div className="flex flex-col gap-[12.5625rem]">
          {/* "Lets talk!" + email — stacked vertically, 21px gap */}
          <div className="flex flex-col gap-[1.3125rem]">
            {heading && (
              <h2 className={`${contactTitle} m-0`}>
                {heading}
              </h2>
            )}
            {email && (
              <p className={`${contactCta} m-0 text-white`}>
                {email}
              </p>
            )}
          </div>

          {/* "Our Offices" + addresses — stacked vertically, 35px gap */}
          <div className="flex flex-col gap-[2.1875rem]">
            <h3 className={`${contactTitle} m-0`}>
              Our Offices
            </h3>
            <div className="max-w-[20.5rem]">
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
                    <p className={`${contactCta} text-white`}>
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
            <h2 className={`${contactTitle} pb-[1.25rem]`}>
              {formHeading}
            </h2>
          )}
          <ContactForm 
            platformOptions={ecommercePlatforms ?? undefined}
            hearAboutUsOptions={hearAboutUsOptions ?? undefined}
          />
        </div>

      </div>
    </section>
  )
}
