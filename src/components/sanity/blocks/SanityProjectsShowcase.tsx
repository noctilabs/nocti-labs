'use client';

import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { getNavTheme } from '@/lib/colorUtils'
import type { PAGE_QUERYResult } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>[number]
type BaseProjectsShowcase = Extract<PageBlock, { _type: 'projectsShowcase' }>
type SanityProjectsShowcaseProps = BaseProjectsShowcase & {
  backgroundColor?: string
  headingColor?: string
}

export default function SanityProjectsShowcase({
  heading,
  projects,
  backgroundColor,
  headingColor,
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
  const navTheme = getNavTheme(backgroundColor)

  return (
    <section
      className="text-black flex flex-col relative"
      data-nav-theme={navTheme}
      style={{ backgroundColor: backgroundColor || '#ffffff', paddingBottom: '0' }}
      suppressHydrationWarning
    >
      {heading && (
        <div
          style={{
            paddingLeft: 'clamp(20px, 3vw, 40px)',
            paddingRight: 'clamp(20px, 3vw, 40px)',
            paddingTop: 'clamp(20px, 2.84vw, 100vw)',
            paddingBottom: 'clamp(8px, 0.97vw, 100vw)',
          }}
        >
          <h2
            style={{
              color: headingColor || '#000000',
              fontSize: 'clamp(28px, 3.32vw, 100vw)',
              fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 500,
              fontStyle: 'normal',
              lineHeight: '1.042',
              letterSpacing: '0',
            }}
          >
            {heading}
          </h2>
        </div>
      )}
      {/* Full Screen Green Placeholder Section */}
      <div
        className="w-full flex items-start justify-center relative"
        style={{
          paddingLeft: 'clamp(20px, 3vw, 40px)',
          paddingRight: 'clamp(20px, 3vw, 40px)',
          paddingTop: heading ? '0' : 'clamp(20px, 3vw, 40px)',
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
                className="absolute bg-white"
                style={{
                  bottom: 'clamp(20px, 6.99vw, 100vw)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 10,
                  height: 'clamp(40px, 4.15vw, 100vw)',
                  width: 'clamp(250px, 41.87vw, 100vw)',
                  borderRadius: '3px',
                  paddingLeft: 'clamp(8px, 0.76vw, 100vw)',
                  paddingRight: 'clamp(8px, 0.76vw, 100vw)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                <p
                  style={{
                    fontSize: 'clamp(11px, 0.97vw, 100vw)',
                    fontFamily: 'var(--font-mono), "Courier New", Courier, monospace',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    lineHeight: '1.286',
                    letterSpacing: '0',
                    textAlign: 'center',
                    color: '#000000',
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
