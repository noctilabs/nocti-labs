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
  const officeList = offices && offices.map((office, index) => {
    const locationLine = [office.city, office.state, office.country].filter(Boolean).join(', ');
    const hasAddressParts = office.address || office.stateAbbr || office.zip;
    const addressLine = hasAddressParts
      ? [office.address, office.city && (office.stateAbbr || office.zip) ? `${office.city}, ${[office.stateAbbr, office.zip].filter(Boolean).join(' ')}` : null].filter(Boolean).join(', ')
      : '';
    return (
      <div key={office._key} className={index > 0 ? 'mt-[1.73rem]' : ''}>
        <p className={`${contactCta} text-white`}>
          {locationLine}
          {addressLine && (<><br />{addressLine}</>)}
        </p>
      </div>
    );
  });

  return (
    <section
      data-nav-theme="dark"
      className="bg-black text-white scroll-mt-[7rem]"
    >
      {/* ── MOBILE LAYOUT ── */}
      <div className="md:hidden px-[1.4rem] pt-[4.5rem] pb-[3.4rem] flex flex-col">
        {/* Let's talk! */}
        <div className="mb-[8.9rem]">
          {heading && (
            <h2 className="font-body font-medium text-[4.4rem] leading-[5rem] m-0 mb-[2.5rem]">
              {heading}
            </h2>
          )}
          {email && (
            <a href={`mailto:${email}`} className="font-body font-medium text-[2.4rem] leading-[2.5rem] m-0 text-white email-link">
              {email}
            </a>
          )}
        </div>

        {/* Our Offices */}
        <div className="mb-[8.9rem]">
          <h3 className="font-body font-medium text-[4.4rem] leading-[5rem] m-0 mb-[2.5rem]">
            Our Offices
          </h3>
          <div>
            {offices && offices.map((office, index) => {
              const locationLine = [office.city, office.state, office.country].filter(Boolean).join(', ');
              const hasAddressParts = office.address || office.stateAbbr || office.zip;
              const addressLine = hasAddressParts
                ? [office.address, office.city && (office.stateAbbr || office.zip) ? `${office.city}, ${[office.stateAbbr, office.zip].filter(Boolean).join(' ')}` : null].filter(Boolean).join(', ')
                : '';
              return (
                <div key={office._key} className={index > 0 ? 'mt-[1.73rem]' : ''}>
                  <p className="font-body font-medium text-[2.4rem] leading-[2.5rem] text-white m-0">
                    {locationLine}{addressLine && (<><br />{addressLine}</>)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <div>
          {formHeading && (
            <h2 className="font-body font-medium text-[4.4rem] leading-[5rem] m-0 mb-[3rem]">
              {formHeading}
            </h2>
          )}
          <ContactForm
            platformOptions={ecommercePlatforms ?? undefined}
            hearAboutUsOptions={hearAboutUsOptions ?? undefined}
          />
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden md:block pt-[2.34rem] pb-[8.34rem] pl-section-x pr-[10.73rem]">
        <div className="grid grid-cols-1 lg:grid-cols-[673fr_442fr] gap-[9.34rem]">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-[12.5625rem]">
            <div className="flex flex-col gap-[1.3125rem]">
              {heading && <h2 className={`${contactTitle} m-0`}>{heading}</h2>}
              {email && <a href={`mailto:${email}`} className={`${contactCta} m-0 text-white email-link w-fit`}>{email}</a>}
            </div>
            <div className="flex flex-col gap-[2.1875rem]">
              <h3 className={`${contactTitle} m-0`}>Our Offices</h3>
              <div className="max-w-[20.5rem]">{officeList}</div>
            </div>
          </div>

          {/* RIGHT COLUMN — form */}
          <div>
            {formHeading && (
              <h2 className={`${contactTitle} pb-[1.25rem]`}>{formHeading}</h2>
            )}
            <ContactForm
              platformOptions={ecommercePlatforms ?? undefined}
              hearAboutUsOptions={hearAboutUsOptions ?? undefined}
            />
          </div>

        </div>
      </div>
    </section>
  )
}
