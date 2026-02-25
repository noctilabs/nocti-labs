'use client';

import { urlFor } from '@/sanity/lib/image'
import type { PAGE_QUERYResult } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>[number]
type SanityProjectsShowcaseProps = Extract<PageBlock, { _type: 'projectsShowcase' }>

export default function SanityProjectsShowcase({
  heading,
  projects,
}: SanityProjectsShowcaseProps) {
  return (
    <section
      className="bg-white text-black flex flex-col relative"
      data-nav-theme="light"
      style={{ paddingBottom: '0', minHeight: '100vh' }}
      suppressHydrationWarning
    >
      {heading && (
        <div
          style={{
            paddingLeft: 'clamp(20px, 3vw, 40px)',
            paddingRight: 'clamp(20px, 3vw, 40px)',
            paddingTop: 'clamp(20px, 2.5vw, 35px)',
          }}
        >
          <h2 className="font-body text-[48px] font-bold">{heading}</h2>
        </div>
      )}
      {/* Full Screen Green Placeholder Section */}
      <div
        className="w-full flex-1 flex items-start justify-center relative"
        style={{
          paddingLeft: 'clamp(20px, 3vw, 40px)',
          paddingRight: 'clamp(20px, 3vw, 40px)',
          paddingTop: 'clamp(30px, 5vw, 60px)',
          paddingBottom: 'clamp(80px, 10vw, 136px)',
          minHeight: heading ? 'auto' : '100vh',
        }}
      >
        <div
          className="bg-[#00FF17] relative w-full"
          style={{
            aspectRatio: '1200/667',
            paddingLeft: 'clamp(20px, 3vw, 40px)',
            paddingRight: 'clamp(20px, 3vw, 40px)',
            borderRadius: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {projects && projects.length > 0 ? (
            <>
              {/* Display first project's cover image if available */}
              {projects[0]?.coverImage?.asset?._ref ? (
                <img
                  src={urlFor(projects[0].coverImage).width(1400).url()}
                  alt={projects[0]?.title || ''}
                  className="w-full h-full object-cover rounded-[3px]"
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    maxWidth: '614px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(0px, 2vw, 20px)',
                  }}
                >
                  <div className="text-center">
                    <p
                      className="font-mono uppercase font-bold text-[#FF0000] italic"
                      style={{
                        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                        lineHeight: 'clamp(2.25rem, 6vw, 4.5rem)',
                        wordBreak: 'break-word',
                      }}
                    >
                      PROJECTS SHOWCASE
                    </p>
                  </div>
                </div>
              )}

              {/* Project Caption - overlapping the green box */}
              <div
                className="absolute bg-white rounded-[3px]"
                style={{
                  bottom: 'clamp(20px, 4vw, 41px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 10,
                  height: 'clamp(44px, 6vw, 60px)',
                  maxWidth: 'clamp(250px, 60vw, 605px)',
                  width: 'clamp(250px, 40vw, 605px)',
                  paddingTop: 'clamp(16px, 3vw, 32px)',
                  paddingBottom: 'clamp(16px, 3vw, 32px)',
                  paddingLeft: 'clamp(16px, 3vw, 32px)',
                  paddingRight: 'clamp(16px, 3vw, 32px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <p
                  className="font-mono uppercase text-black opacity-80 text-center font-semibold"
                  style={{
                    fontSize: 'clamp(11px, 2vw, 14px)',
                    lineHeight: '1.4',
                  }}
                >
                  {projects[0]?.client && `${projects[0].client}, `}
                  {projects[0]?.title}
                </p>
              </div>
            </>
          ) : (
            <div
              style={{
                width: '100%',
                maxWidth: '614px',
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(0px, 2vw, 20px)',
              }}
            >
              <div className="text-center">
                <p
                  className="font-mono uppercase font-bold text-[#FF0000] italic"
                  style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    lineHeight: 'clamp(2.25rem, 6vw, 4.5rem)',
                    wordBreak: 'break-word',
                  }}
                >
                  PROJECTS FULL SCREEN
                </p>
                <p
                  className="font-mono uppercase font-bold text-[#FF0000] italic"
                  style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    lineHeight: 'clamp(2.25rem, 6vw, 4.5rem)',
                    wordBreak: 'break-word',
                  }}
                >
                  ANIMATION / VIDEO
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
