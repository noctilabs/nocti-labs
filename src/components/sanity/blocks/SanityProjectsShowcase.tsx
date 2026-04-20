'use client';

import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { getNavTheme } from '@/lib/colorUtils'
import { heading as headingCls } from '@/lib/typography'
import type { PAGE_QUERY_RESULT } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERY_RESULT>['pageBuilder']>[number]
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
      data-nav-theme={navTheme}
      className="text-white flex flex-col relative pb-0 h-screen overflow-hidden"
      style={{ backgroundColor: backgroundColor || '#000000' }}
      suppressHydrationWarning
    >
      {/* ── MOBILE LAYOUT ── */}
      <div data-nav-theme="dark" className="md:hidden bg-black text-white pt-[4.5rem] pb-[2.9rem]">
        {heading && (
          <h2
            className="font-body font-medium text-[4.4rem] leading-[5rem] m-0 mb-[4.1rem] px-[1.4rem]"
            style={{ color: headingColor || '#ffffff' }}
          >
            {heading}
          </h2>
        )}
        <div className="relative mx-[2.1rem] rounded-[16px] overflow-hidden aspect-[377/731] max-h-[73.1rem]">
          {firstProject ? (
            <>
              {firstProject.coverVideoUrl ? (
                <video
                  src={firstProject.coverVideoUrl}
                  className="w-full h-full object-cover rounded-[16px]"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : firstProject.coverImage?.asset?._ref ? (
                <Image
                  src={urlFor(firstProject.coverImage).width(377).url()}
                  alt={firstProject.title || ''}
                  fill
                  className="object-cover rounded-[16px]"
                />
              ) : (
                <div className="bg-[#1500ff] w-full h-full rounded-[16px]" />
              )}
              {/* Caption — overlaid at bottom inside the media, matching Figma */}
              <div className="absolute bottom-[2.5rem] left-1/2 -translate-x-1/2 z-10 bg-white rounded-[16px] px-[1rem] py-[0.8rem] w-[91.5%] flex items-center justify-center">
                <p className="font-mono text-[1.4rem] leading-[2.3rem] text-center text-black m-0">
                  {firstProject.client && `${firstProject.client}, `}
                  {firstProject.title}
                </p>
              </div>
            </>
          ) : (
            <div className="bg-[#1500ff] w-full h-full rounded-[16px]" />
          )}
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden md:flex md:flex-col flex-1 min-h-0" data-nav-theme={navTheme}>
        {heading && (
          <div className="px-section-x pt-[2.34rem] pb-[1.94rem] shrink-0">
            <h2
              className={headingCls}
              style={{ color: headingColor || '#ffffff' }}
            >
              {heading}
            </h2>
          </div>
        )}
        <div className="flex-1 min-h-0 w-full flex items-center justify-center px-section-x pb-[3rem]">
          <div className="relative inline-flex max-w-full max-h-full">
            {firstProject ? (
              <>
                {firstProject.coverVideoUrl ? (
                  <video
                    src={firstProject.coverVideoUrl}
                    className="max-w-full max-h-full w-auto h-auto rounded-[16px] block"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : firstProject.coverImage?.asset?._ref ? (
                  <Image
                    src={urlFor(firstProject.coverImage).width(1920).url()}
                    alt={firstProject.title || ''}
                    width={1920}
                    height={1080}
                    className="max-w-full max-h-full w-auto h-auto rounded-[16px] object-contain block"
                  />
                ) : (
                  <div className="bg-[#1500ff] w-full h-full rounded-[16px]" />
                )}
                <div className="absolute bg-white bottom-[2.5rem] left-1/2 -translate-x-1/2 z-10 h-[3.75rem] w-[37.8rem] rounded-[0.2rem] flex items-center justify-center">
                  <p className="text-[0.875rem] font-mono font-normal not-italic leading-[1.4375rem] tracking-[0] text-center text-black">
                    {firstProject.client && `${firstProject.client}, `}
                    {firstProject.title}
                  </p>
                </div>
              </>
            ) : (
              <div className="bg-[#1500ff] w-full h-full rounded-[16px]" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
