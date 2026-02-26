'use client'

import { useState } from 'react'
import SanityCta from '@/components/sanity/shared/SanityCta'
import type { PAGE_QUERYResult } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>[number]
type SanityServicesShowcaseProps = Extract<PageBlock, { _type: 'servicesShowcase' }>

export default function SanityServicesShowcase({
  heading,
  services,
  cta,
}: SanityServicesShowcaseProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleService = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }
  return (
    <section
      data-nav-theme="light"
      className="bg-white text-black flex flex-col relative"
      style={{ paddingBottom: '0' }}
      suppressHydrationWarning
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          paddingLeft: '40px',
          paddingRight: '40px',
          paddingTop: 'clamp(20px, 3vw, 50px)',
          paddingBottom: '0px',
        }}
      >
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          {/* Main Title */}
          {heading && (
            <div
              style={{
                color: 'black',
                fontSize: 'clamp(32px, 6vw, 48px)',
                fontFamily: '"Neue Haas Unica Pro", system-ui, sans-serif',
                fontWeight: '500',
                lineHeight: '1.2',
                wordWrap: 'break-word',
                marginBottom: '80px',
              }}
            >
              {heading}
            </div>
          )}

          {/* Services Content */}
          {services && services.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(60px, 10vw, 120px)' }}>
              {/* Service Categories - Accordion */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                {services.map((service, index) => {
                  const isExpanded = expandedId === service._id
                  const isFirstItem = index === 0
                  return (
                    <div key={service._id}>
                      {/* Service Title - Clickable */}
                      <div
                        onClick={() => toggleService(service._id)}
                        style={{
                          color: 'black',
                          fontSize: 'clamp(32px, 5vw, 48px)',
                          fontFamily: '"Neue Haas Unica Pro", system-ui, sans-serif',
                          fontWeight: '500',
                          lineHeight: '1.2',
                          wordWrap: 'break-word',
                          paddingTop: 'clamp(10px, 2vw, 24px)',
                          paddingBottom: 'clamp(10px, 2vw, 24px)',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'opacity 0.3s ease',
                          userSelect: 'none',
                          borderTop: isFirstItem ? '2px solid black' : 'none',
                          borderRight: 'none',
                          borderBottom: '2px solid black',
                          borderLeft: 'none',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                      >
                        <span>{service.title}</span>
                        <span style={{ fontSize: 'clamp(20px, 3vw, 32px)' }}>
                          {isExpanded ? '−' : '▼'}
                        </span>
                      </div>

                      {/* Service Items/Description - Collapsible */}
                      {isExpanded && service.items && service.items.length > 0 && (
                        <div
                          style={{
                            color: 'black',
                            fontSize: 'clamp(24px, 3.5vw, 32px)',
                            fontFamily: '"Neue Haas Unica Pro", system-ui, sans-serif',
                            fontWeight: '500',
                            lineHeight: '1.3',
                            wordWrap: 'break-word',
                            whiteSpace: 'pre-wrap',
                            paddingBottom: 'clamp(20px, 3vw, 40px)',
                            paddingLeft: 'clamp(20px, 3vw, 40px)',
                            paddingRight: 'clamp(20px, 3vw, 40px)',
                            animation: 'slideDown 0.3s ease',
                          }}
                        >
                          {service.items.join('\n')}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* CTA */}
              {cta && (
                <div style={{ marginTop: '0px', marginBottom: '40px', fontWeight: 600 }}>
                  <SanityCta {...cta} className="text-black" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
