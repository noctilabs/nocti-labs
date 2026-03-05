import ContactForm from './ContactForm'
import type { PAGE_QUERYResult } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>[number]
type SanityContactSectionProps = Extract<PageBlock, { _type: 'contactSection' }>

const TITLE_STYLE: React.CSSProperties = {
  fontSize: 'clamp(28px, 3.32vw, 100vw)',
  fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontWeight: 500,
  fontStyle: 'normal',
  lineHeight: '1.042',
  letterSpacing: '0',
}

const CTA_STYLE: React.CSSProperties = {
  fontSize: 'clamp(18px, 1.66vw, 100vw)',
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
        paddingTop: 'clamp(60px, 9.48vw, 100vw)',
        paddingBottom: 'clamp(60px, 8.34vw, 100vw)',
        paddingLeft: 'clamp(20px, 2.77vw, 100vw)',
        paddingRight: 'clamp(40px, 10.73vw, 100vw)',
      }}
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-[673fr_442fr]"
        style={{ gap: 'clamp(40px, 9.34vw, 100vw)' }}
      >

        {/* LEFT COLUMN */}
        <div>
          {/* "Lets talk!" + email — side by side */}
          <div style={{ display: 'flex', alignItems: 'start', gap: 'clamp(12px, 1.38vw, 100vw)' }}>
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
                  paddingTop: 'clamp(10px, 1.59vw, 100vw)',
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
              gap: 'clamp(12px, 1.38vw, 100vw)',
              marginTop: 'clamp(150px, 18.75vw, 100vw)',
            }}
          >
            <h3 style={TITLE_STYLE}>
              Our Offices
            </h3>
            <div
              style={{
                paddingTop: 'clamp(8px, 1.63vw, 100vw)',
                width: 'clamp(200px, 22.7vw, 100vw)',
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
                      marginTop: index > 0 ? 'clamp(16px, 1.73vw, 100vw)' : 0,
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
            <h2 style={{ ...TITLE_STYLE, paddingBottom: 'clamp(12px, 1.58vw, 100vw)' }}>
              {formHeading}
            </h2>
          )}
          <ContactForm />
        </div>

      </div>
    </section>
  )
}
