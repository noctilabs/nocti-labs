import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { PAGE_QUERYResult } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>[number]
type SanityInsightsGridProps = Extract<PageBlock, { _type: 'insightsGrid' }>

export default function SanityInsightsGrid({
  heading,
  featuredPosts,
}: SanityInsightsGridProps) {
  return (
    <section
      data-nav-theme="dark"
      className="bg-black text-white"
      style={{
        paddingTop: 'clamp(40px, 2.34vw, 100vw)',
        marginLeft: 'clamp(20px, 2.77vw, 100vw)',
        marginRight: 'clamp(20px, 2.77vw, 100vw)',
        marginBottom: 'clamp(20px, 2.77vw, 100vw)',
      }}
    >
        {heading && (
          <h2
            style={{
              fontSize: 'clamp(28px, 3.32vw, 100vw)',
              fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 500,
              fontStyle: 'normal',
              lineHeight: '1.042',
              letterSpacing: '0',
              paddingTop: '0',
              paddingBottom: 'clamp(50px, 7.11vw, 100vw)',
            }}
          >
            {heading}
          </h2>
        )}

        {featuredPosts && featuredPosts.length > 0 && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            style={{
              gap: 'clamp(12px, 1.42vw, 100vw)',
              paddingBottom: 'clamp(20px, 2.77vw, 100vw)',
            }}
          >
            {featuredPosts.map((post) => (
              <div key={post._id} className="group cursor-pointer flex flex-col">
                {/* Cover Image */}
                {post.coverImage?.asset?._ref ? (
                  <Image
                    src={urlFor(post.coverImage).width(652).height(442).url()}
                    alt={post.title || ''}
                    width={652}
                    height={442}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 22.55vw"
                    className="w-full h-auto object-cover group-hover:opacity-80 transition"
                  />
                ) : (
                  <div className="w-full aspect-[326/221] bg-gray-800 group-hover:opacity-80 transition" />
                )}

                {/* Text content */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(10px, 1.38vw, 100vw)',
                    marginTop: 'clamp(12px, 1.38vw, 100vw)',
                  }}
                >
                  {/* Title */}
                  <h3
                    style={{
                      fontSize: 'clamp(16px, 1.66vw, 100vw)',
                      fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontWeight: 500,
                      fontStyle: 'normal',
                      lineHeight: '1.042',
                      letterSpacing: '0',
                      color: 'white',
                    }}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p
                      style={{
                        fontSize: 'clamp(11px, 0.97vw, 100vw)',
                        fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        lineHeight: '1.143',
                        letterSpacing: '0',
                        color: 'white',
                      }}
                    >
                      {post.excerpt}
                    </p>
                  )}

                  {/* Author */}
                  {post.author && (
                    <p
                      style={{
                        fontSize: 'clamp(11px, 0.97vw, 100vw)',
                        fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        lineHeight: '1.143',
                        letterSpacing: '0',
                        color: '#a8a8a8',
                      }}
                    >
                      {post.author}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <Link
          href="/blog"
          className="text-white hover:opacity-70 transition inline-block"
          style={{
            fontSize: 'clamp(18px, 1.66vw, 100vw)',
            fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 500,
            fontStyle: 'normal',
            lineHeight: '1.042',
            letterSpacing: '0',
            paddingTop: 'clamp(20px, 2.81vw, 100vw)',
            paddingBottom: 'clamp(20px, 2.59vw, 100vw)',
          }}
        >
          Read our Blog →
        </Link>
    </section>
  )
}
