'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { PortableText, PortableTextComponents } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'
import type { BlogPost } from '../../../sanity.types'

type Props = {
  post: BlogPost
}

function formatDate(dateString?: string | null): string {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function makePortableTextComponents(sectionRefs: React.RefObject<Record<string, HTMLElement | null>>): PortableTextComponents {
  return {
    block: {
      normal: ({ children }) => (
        <p className="font-body font-medium text-[1.5rem] leading-[1.5625rem] text-white mb-[1.5625rem] min-h-[1.5625rem]">
          {children}
        </p>
      ),
      // Figma h2: 32px / 37px medium
      h2: ({ children, value }) => (
        <h2
          id={`section-${value._key}`}
          ref={(el) => { if (sectionRefs.current && value._key) sectionRefs.current[value._key] = el }}
          className="font-body font-medium text-[2rem] leading-[2.3125rem] text-white mt-[1.5625rem] mb-[1.5625rem]"
        >
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="font-body font-medium text-[1.5rem] leading-[1.5625rem] text-white mt-[1.5625rem] mb-[1.5625rem]">
          {children}
        </h3>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-2 border-white pl-[1.5rem] font-body font-medium text-[1.5rem] leading-[1.5625rem] text-white opacity-80 mb-[1.5625rem]">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-none pl-[1.5rem] mb-[1.5625rem] text-white [&>li]:relative [&>li]:before:content-['•'] [&>li]:before:absolute [&>li]:before:left-[-1rem] [&>li]:before:text-[12px] [&>li]:before:leading-[1.5625rem] [&>li]:before:top-[0.2rem]">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal list-outside pl-[1.5rem] mb-[1.5625rem] text-white">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="font-body font-medium text-[1.5rem] leading-[1.5625rem]">{children}</li>
      ),
      number: ({ children }) => (
        <li className="font-body font-medium text-[1.5rem] leading-[1.5625rem]">{children}</li>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-medium">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({ value, children }) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-70 transition"
        >
          {children}
        </a>
      ),
    },
    types: {
      image: ({ value }) => {
        if (!value?.asset) return null
        return (
          <div className="my-[3rem] w-full">
            <Image
              src={urlFor(value).width(918).height(480).url()}
              alt={value.alt || ''}
              width={918}
              height={480}
              className="w-full h-auto object-cover"
            />
          </div>
        )
      },
    },
  }
}

export default function BlogPostPage({ post }: Props) {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)

  const h2Headings = (post.body ?? [])
    .filter((block) => block._type === 'block' && block.style === 'h2')
    .map((block) => {
      if (block._type !== 'block') return null
      return { key: block._key, text: block.children?.map((c) => c.text).join('') ?? '' }
    })
    .filter(Boolean) as { key: string; text: string }[]

  // Intersection observer: track which h2 is in view
  useEffect(() => {
    if (h2Headings.length === 0) return

    const observers: IntersectionObserver[] = []

    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.3

      let currentKey: string | null = null
      for (const { key } of h2Headings) {
        const el = sectionRefs.current[key]
        if (!el) continue
        if (el.getBoundingClientRect().top + window.scrollY <= scrollY) {
          currentKey = key
        }
      }
      setActiveKey(currentKey)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    observers.push({ disconnect: () => window.removeEventListener('scroll', handleScroll) } as unknown as IntersectionObserver)

    return () => observers.forEach((o) => o.disconnect())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [h2Headings.length])

  const scrollToSection = (key: string) => {
    const el = sectionRefs.current[key]
    if (!el) return
    // Nav is fixed at top-[2.5rem] (40px) with 60px height → offset 100px + 24px breathing room
    const NAV_OFFSET = 124
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const portableTextComponents = makePortableTextComponents(sectionRefs)

  // The active dot key: hovered takes priority, else scroll-tracked
  const dotKey = hoveredKey ?? activeKey

  return (
    <main data-nav-theme="dark" className="bg-black text-white min-h-screen">

      {/* ── Header: date + author ───────────────────────────── */}
      <div className="flex items-center justify-between pt-[15.125rem] px-[6.4375rem]">
        <p className="font-body font-medium text-[1.5rem] leading-[1.5625rem]">
          {formatDate(post.publishedAt)}
        </p>
        {post.author && (
          <div className="flex items-center gap-[0.6875rem]">
            {post.authorImage?.asset?._ref && (
              <Image
                src={urlFor(post.authorImage).width(39).height(39).url()}
                alt={post.author}
                width={39}
                height={39}
                className="rounded-full object-cover size-[2.4375rem] shrink-0"
              />
            )}
            <p className="font-body font-medium text-[1.5rem] leading-[1.5625rem]">
              {post.author}
            </p>
          </div>
        )}
      </div>

      {/* ── Title ───────────────────────────────────────────── */}
      {post.title && (
        <h1 className="font-body font-medium text-[5.625rem] leading-[5.625rem] text-white px-[6.28125rem] mt-[3.9375rem] mb-0">
          {post.title}
        </h1>
      )}

      {/* ── Hero image ──────────────────────────────────────── */}
      {post.coverImage?.asset?._ref && (
        <div className="px-[5.75rem] mt-[2.625rem]">
          <Image
            src={urlFor(post.coverImage).width(1251).height(849).url()}
            alt={post.title || ''}
            width={1251}
            height={849}
            priority
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* ── Two-column: sidebar TOC + body ──────────────────── */}
      <div className="flex mt-[2.625rem] pb-[6rem]">

        {/* Sidebar */}
        <aside className="shrink-0 pl-[2.9375rem] w-[15.75rem] pt-[10.25rem] self-start sticky top-0">
          <p className="font-body font-normal text-[1.5rem] leading-[1.8125rem] w-[11.125rem] mb-[1.1875rem]">
            Index / Content
          </p>
          <nav className="flex flex-col w-[10.6875rem]">
            {h2Headings.map((item) => {
              const isActive = dotKey === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.key)}
                  onMouseEnter={() => setHoveredKey(item.key)}
                  onMouseLeave={() => setHoveredKey(null)}
                  className="flex items-start gap-[0.5rem] text-left mb-[1rem] group"
                >
                  {/* Blue dot indicator */}
                  <span
                    className="mt-[0.25rem] shrink-0 size-[0.5rem] rounded-full transition-colors duration-200"
                    style={{ backgroundColor: isActive ? '#2563eb' : 'transparent' }}
                  />
                  <span
                    className="font-body font-normal text-[0.875rem] leading-[1rem] transition-opacity duration-200"
                    style={{ opacity: isActive ? 1 : 0.5 }}
                  >
                    {item.text}
                  </span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Body content */}
        <article className="w-[57.375rem]">
          {post.body && (
            <PortableText value={post.body} components={portableTextComponents} />
          )}
        </article>
      </div>

    </main>
  )
}
