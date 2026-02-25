'use client';

import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { PAGE_QUERYResult } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>[number]
type SanityProjectsShowcaseProps = Extract<PageBlock, { _type: 'projectsShowcase' }>

export default function SanityProjectsShowcase({
  heading,
  projects,
}: SanityProjectsShowcaseProps) {
  type ProjectsShowcaseProjectWithVideo = {
    coverVideoUrl?: string
    coverImage?: {
      asset?: {
        _ref?: string
      }
    }
    title?: string
    client?: string
  }
  const firstProject = projects?.[0] as ProjectsShowcaseProjectWithVideo | undefined

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
            paddingBottom: '10px',
          }}
        >
          <h2 className="font-body text-[48px] font-semibold">{heading}</h2>
        </div>
      )}
      {/* Full Screen Green Placeholder Section */}
      <div
        className="w-full flex-1 flex items-start justify-center relative"
        style={{
          paddingLeft: 'clamp(20px, 3vw, 40px)',
          paddingRight: 'clamp(20px, 3vw, 40px)',
          paddingTop: '10px',
          paddingBottom: 'clamp(80px, 10vw, 136px)',
          minHeight: heading ? 'auto' : '100vh',
        }}
      >
        <div
          className="relative w-full"
          style={{
            aspectRatio: '1200/667',
            borderRadius: '3px',
          }}
        >
          {firstProject ? (
            <>
              {firstProject.coverVideoUrl ? (
                <video
                  src={firstProject.coverVideoUrl}
                  className="w-full h-full object-cover rounded-[3px]"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : firstProject.coverImage?.asset?._ref ? (
                <Image
                  src={urlFor(firstProject.coverImage).width(1200).url()}
                  alt={firstProject.title || ''}
                  width={1200}
                  height={667}
                  className="w-full h-full object-cover rounded-[3px]"
                />
              ) : (
                <div
                  className="bg-[#00FF17] w-full h-full rounded-[3px]"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: 'clamp(20px, 3vw, 40px)',
                    paddingRight: 'clamp(20px, 3vw, 40px)',
                  }}
                >
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
                </div>
              )}
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
                  {firstProject.client && `${firstProject.client}, `}
                  {firstProject.title}
                </p>
              </div>
            </>
          ) : (
            <div
              className="bg-[#00FF17] w-full h-full rounded-[3px]"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 'clamp(20px, 3vw, 40px)',
                paddingRight: 'clamp(20px, 3vw, 40px)',
              }}
            >
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
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
