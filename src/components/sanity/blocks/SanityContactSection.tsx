import ContactForm from './ContactForm'
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
      style={{
        background: 'black',
        color: 'white',
        paddingTop: '100px',
        paddingBottom: '80px',
        paddingLeft: '40px',
        paddingRight: '40px',
      }}
    >
      {/* Two-column layout: left (Lets talk + offices) | right (form) */}
      <div
        className="grid grid-cols-1 lg:grid-cols-[788fr_442fr] gap-[20px]"
        style={{ marginRight: '100px' }}
      >

        {/* LEFT COLUMN */}
        <div style={{ marginRight: '40px' }}>
          {/* "Lets talk!" + email — side by side in two halves */}
          <div className="grid grid-cols-2 gap-[20px]">
            {heading && (
              <h2 className="font-body text-[48px] font-medium leading-[50px] text-white">
                {heading}
              </h2>
            )}
            {email && (
              <p
                className="font-body text-[24px] font-medium leading-[25px] text-white flex items-center"
                style={{ marginTop: '30px', marginBottom: '0px' }}
              >
                {email}
              </p>
            )}
          </div>

          {/* "Our Offices" + addresses — side by side in two halves */}
          <div
            className="grid grid-cols-2 gap-[20px]"
            style={{ marginTop: '100px', marginBottom: '100px' }}
          >
            <h3 className="font-body text-[48px] font-medium leading-[50px] text-white">
              Our Offices
            </h3>
            <div style={{ marginTop: '30px' }}>
              {offices && offices.map((office) => {
                const locationLine = [office.city, office.state, office.country].filter(Boolean).join(', ');
                const hasAddressParts = office.address || office.stateAbbr || office.zip;
                const addressLine = hasAddressParts
                  ? [office.address, office.city && (office.stateAbbr || office.zip) ? `${office.city}, ${[office.stateAbbr, office.zip].filter(Boolean).join(' ')}` : null].filter(Boolean).join(', ')
                  : '';
                return (
                  <div key={office._key} className="mb-[25px] last:mb-0">
                    <p
                      className="font-body text-[24px] font-medium leading-[25px] text-white"
                      style={{ paddingTop: '10px', paddingBottom: '20px' }}
                    >
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
            <h2 className="font-body text-[48px] font-medium leading-[50px] text-white mb-[23px]" style={{ paddingBottom: '20px' }}>
              {formHeading}
            </h2>
          )}
          <ContactForm />
        </div>

      </div>
    </section>
  )
}
