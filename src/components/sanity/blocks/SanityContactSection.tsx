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
    <section data-nav-theme="dark" className="bg-black text-white py-20 px-8 md:px-16">
      {heading && (
        <h2 className="font-body text-[48px] font-bold mb-8">{heading}</h2>
      )}
      {formHeading && (
        <h3 className="font-body text-[48px] font-bold mb-16">
          {formHeading}
        </h3>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Form (client component) */}
        <ContactForm />

        {/* Right Side - Offices */}
        <div>
          <h4 className="font-body text-[48px] font-bold mb-12">Our Offices</h4>

          <div className="space-y-12">
            {offices &&
              offices.map((office) => (
                <div key={office._key}>
                  <p className="font-body text-[18px] whitespace-pre-line">
                    {office.city}, {office.country}
                    {office.address && (
                      <>
                        <br />
                        {office.address}
                      </>
                    )}
                  </p>
                </div>
              ))}

            {email && (
              <div>
                <p className="font-body text-[24px] text-accent">{email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
