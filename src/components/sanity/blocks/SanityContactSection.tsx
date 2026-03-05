import ContactForm from './ContactForm'
import type { PAGE_QUERYResult } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>[number]
type SanityContactSectionProps = Extract<PageBlock, { _type: 'contactSection' }>

const TITLE_STYLE: React.CSSProperties = {
  fontSize: '3.32rem',
  fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontWeight: 500,
  fontStyle: 'normal',
  lineHeight: '1.042',
  letterSpacing: '0',
}

const CTA_STYLE: React.CSSProperties = {
  fontSize: '1.66rem',
  fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontWeight: 500,
  fontStyle: 'normal',
  lineHeight: '1.042',
  letterSpacing: '0',
}

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
        paddingTop: '9.48rem',
        paddingBottom: '8.34rem',
        paddingLeft: '3rem',
        paddingRight: '10.73rem',
      }}
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-[673fr_442fr]"
        style={{ gap: '9.34rem' }}
      >

        {/* LEFT COLUMN */}
        <div>
          {/* "Lets talk!" + email — side by side */}
          <div style={{ display: 'flex', alignItems: 'start', gap: '1.38rem' }}>
            {heading && (
              <h2 style={{ ...TITLE_STYLE, flex: 1, margin: 0 }}>
                {heading}
              </h2>
            )}
            {email && (
              <p
                style={{
                  ...CTA_STYLE,
                  flex: 1,
                  margin: 0,
                  paddingTop: '1.59rem',
                  color: 'white',
                }}
              >
                {email}
              </p>
            )}
          </div>

          {/* "Our Offices" + addresses — side by side */}
          <div
            className="grid grid-cols-2"
            style={{
              gap: '1.38rem',
              marginTop: '18.75rem',
            }}
          >
            <h3 style={TITLE_STYLE}>
              Our Offices
            </h3>
            <div
              style={{
                paddingTop: '1.63rem',
                width: '22.7rem',
              }}
            >
              {offices && offices.map((office, index) => {
                const locationLine = [office.city, office.state, office.country].filter(Boolean).join(', ');
                const hasAddressParts = office.address || office.stateAbbr || office.zip;
                const addressLine = hasAddressParts
                  ? [office.address, office.city && (office.stateAbbr || office.zip) ? `${office.city}, ${[office.stateAbbr, office.zip].filter(Boolean).join(' ')}` : null].filter(Boolean).join(', ')
                  : '';
                return (
                  <div
                    key={office._key}
                    style={{
                      marginTop: index > 0 ? '1.73rem' : 0,
                    }}
                  >
                    <p style={{ ...CTA_STYLE, color: 'white' }}>
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
            <h2 style={{ ...TITLE_STYLE, paddingBottom: '1.58rem' }}>
              {formHeading}
            </h2>
          )}
          <ContactForm />
        </div>

      </div>
    </section>
  )
}
