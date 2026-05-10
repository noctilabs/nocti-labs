'use client'

import Link from 'next/link'
import Image from 'next/image'
import { PortableText, PortableTextComponents } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'
import { heading as headingCls } from '@/lib/typography'

type Project = {
  _id: string
  title?: string | null
  subtitle?: string | null
  client?: string | null
  description?: string | null
  coverImage?: { asset?: { _ref?: string } } | null
  heroImage?: { asset?: { _ref?: string } } | null
  coverVideoUrl?: string | null
  industry?: string | null
  year?: string | null
  services?: string | null
  techStack?: string | null
  features?: string | null
  url?: string | null
  descriptionTitle?: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[] | null
}

type NextProject = {
  slug?: { current?: string } | null
  title?: string | null
}

type Props = {
  project: Project
  nextProject?: NextProject | null
  locale: string
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-body font-normal text-[2rem] leading-[2.3125rem] text-black mb-0 whitespace-pre-wrap min-h-[2.3125rem]">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-body font-medium text-[2rem] leading-[2.3125rem] text-black mt-0 mb-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-body font-medium text-[2rem] leading-[2.3125rem] text-black mt-0 mb-0">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-none mb-0 text-black pl-[2rem]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-none mb-0 text-black">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="font-body font-normal text-[2rem] leading-[2.3125rem] mb-0 flex gap-[1rem]">
        <span aria-hidden>•</span><span>{children}</span>
      </li>
    ),
    number: ({ children, index }) => (
      <li className="font-body font-normal text-[2rem] leading-[2.3125rem] mb-0 flex gap-[1rem]">
        <span>{(index ?? 0) + 1}.</span><span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-medium">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70 transition">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <div className="my-[2.3125rem] w-full">
          <Image
            src={urlFor(value).width(1016).height(600).url()}
            alt={value.alt || ''}
            width={1016}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
      )
    },
  },
}

function MetaRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <>
      <p className="font-body font-medium text-[1.5rem] leading-[1.8125rem] text-black m-0">{label}</p>
      <p className="font-body font-normal text-[1.5rem] leading-[1.8125rem] text-black m-0">{value}</p>
      {/* blank line spacer matching Figma */}
      <p className="font-body text-[1.5rem] leading-[1.8125rem] m-0">&nbsp;</p>
    </>
  )
}

export default function ProjectPage({ project, nextProject, locale }: Props) {
  return (
    <main className="bg-white text-black min-h-screen">

      {/* ── Hero: full-bleed with title centered ── */}
      <div data-nav-theme="dark" className="relative w-full h-screen overflow-hidden">
        {project.heroImage?.asset?._ref ? (
          <Image
            src={urlFor(project.heroImage).width(1440).height(900).url()}
            alt={project.title || ''}
            fill
            priority
            className="object-cover"
          />
        ) : project.coverVideoUrl ? (
          <video
            src={project.coverVideoUrl}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : project.coverImage?.asset?._ref ? (
          <Image
            src={urlFor(project.coverImage).width(1440).height(900).url()}
            alt={project.title || ''}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-300" />
        )}
        <div className="absolute inset-0 bg-black/20" />
        {project.title && (
          <div className="absolute inset-0 flex items-center justify-center px-[4rem]">
            <h1 className="font-body font-medium text-[3rem] leading-[3.125rem] text-white text-center max-w-[37.625rem]">
              {project.title}
            </h1>
          </div>
        )}
      </div>

      {/* ── Two-column body ── */}
      {/* Figma: sidebar left-[40px] w-[293px], content left-[calc(25%+25px)] */}
      <div data-nav-theme="light" className="flex pt-[4rem] pb-[8rem]">

        {/* Left sidebar — 40px from edge, ~293px wide */}
        <aside className="shrink-0 w-[calc(25%+25px)] pl-[2.5rem] pr-[4rem]">
          <MetaRow label="Industry" value={project.industry} />
          <MetaRow label="Year" value={project.year} />
          <MetaRow label="Services" value={project.services} />
          <MetaRow label="Tech Stack" value={project.techStack} />
          <MetaRow label="Features" value={project.features} />
          {project.url && (
            <>
              <p className="font-body font-medium text-[1.5rem] leading-[1.8125rem] text-black m-0">Visit Site</p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body font-normal text-[1.5rem] leading-[1.8125rem] text-black hover:opacity-60 transition m-0 block"
              >
                {project.url.replace(/^https?:\/\//, '')}
              </a>
            </>
          )}
        </aside>

        {/* Right column — subtitle + description title + body */}
        <div className="flex-1 pr-[2.5rem]">
          {project.subtitle && (
            <h2 className="font-body font-medium text-[3rem] leading-[3.125rem] text-black mt-0 mb-[2.3125rem]">
              {project.subtitle}
            </h2>
          )}
          {project.descriptionTitle && (
            <p className={`${headingCls} text-black m-0 mb-[26px]`}>
              {project.descriptionTitle}
            </p>
          )}
          {project.body && project.body.length > 0 ? (
            <PortableText value={project.body} components={portableTextComponents} />
          ) : project.description ? (
            <p className="font-body font-normal text-[2rem] leading-[2.3125rem] text-black m-0">
              {project.description}
            </p>
          ) : null}
        </div>
      </div>

      {/* ── Bottom navigation ── */}
      {/* Figma: Back at left-[40px], Next at calc(25%+25px) */}
      <div data-nav-theme="light" className="relative pt-[2rem] pb-[8.4375rem]">
        <Link
          href={`/${locale}/work`}
          className="absolute left-[2.5rem] font-body font-medium text-[1.5rem] leading-[1.5625rem] text-black hover:opacity-60 transition"
        >
          ← Back to Work
        </Link>
        {nextProject?.slug?.current && (
          <Link
            href={`/${locale}/work/${nextProject.slug.current}`}
            className="absolute left-[calc(25%+25px)] font-body font-medium text-[1.5rem] leading-[1.5625rem] text-black hover:opacity-60 transition"
          >
            Next Project →
          </Link>
        )}
      </div>

    </main>
  )
}
