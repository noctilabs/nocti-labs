'use client';

import Image from 'next/image'
import { createDataAttribute } from '@sanity/visual-editing'
import { urlFor } from '@/sanity/lib/image'
import { getNavTheme } from '@/lib/colorUtils'
import { heading as headingCls } from '@/lib/typography'
import type { PAGE_QUERYResult } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>[number]
type BaseProjectsShowcase = Extract<PageBlock, { _type: 'projectsShowcase' }>
type SanityProjectsShowcaseProps = BaseProjectsShowcase & {
  backgroundColor?: string
  headingColor?: string
  documentId?: string
}

export default function SanityProjectsShowcase({
  heading,
  projects,
  backgroundColor,
  headingColor,
  _key,
  documentId,
}: SanityProjectsShowcaseProps) {
  const attr = (path: string) =>
    documentId
      ? { 'data-sanity': createDataAttribute({ id: documentId, type: 'page', path: `pageBuilder[_key=="${_key}"].${path}` }).toString() }
      : {}
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
      className="text-black flex flex-col relative pb-0"
      data-nav-theme={navTheme}
      style={{ backgroundColor: backgroundColor || '#ffffff' }}
      suppressHydrationWarning
    >
      {heading && (
        <div className="px-section-x pt-[2.84rem] pb-[0.97rem]">
          <h2
            className={headingCls}
            style={{ color: headingColor || '#000000' }}
            {...attr('heading')}
          >
            {heading}
          </h2>
        </div>
      )}
      {/* Full Screen Green Placeholder Section */}
      <div
        className={`w-full flex items-start justify-center relative px-section-x pb-[10rem] ${heading ? 'pt-0' : 'pt-[3rem] min-h-screen'}`}
      >
        <div className="relative w-full aspect-[1200/667] rounded-[3px]">
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
                <div className="bg-[#00FF17] w-full h-full rounded-[3px] flex items-center justify-center px-section-x">
                  <div className="w-full max-w-[614px] flex flex-col gap-8">
                    <div className="text-center">
                      <p className="font-mono uppercase font-bold text-[#FF0000] italic text-[4rem] leading-[6rem] break-words">
                        PROJECTS SHOWCASE
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="absolute bg-white bottom-[6.99rem] left-1/2 -translate-x-1/2 z-10 h-[4.15rem] w-[41.87rem] rounded-[3px] px-[0.76rem] flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15),0_2px_4px_rgba(0,0,0,0.1)]">
                <p className="text-[0.97rem] font-mono font-normal not-italic leading-[1.286] tracking-[0] text-center text-black">
                  {firstProject.client && `${firstProject.client}, `}
                  {firstProject.title}
                </p>
              </div>
            </>
          ) : (
            <div className="bg-[#00FF17] w-full h-full rounded-[3px] flex items-center justify-center px-section-x">
              <div className="w-full max-w-[614px] flex flex-col gap-8">
                <div className="text-center">
                  <p className="font-mono uppercase font-bold text-[#FF0000] italic text-[4rem] leading-[6rem] break-words">
                    PROJECTS FULL SCREEN
                  </p>
                  <p className="font-mono uppercase font-bold text-[#FF0000] italic text-[4rem] leading-[6rem] break-words">
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
