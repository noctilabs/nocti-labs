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
        paddingTop: '2.34rem',
        marginLeft: '2.77rem',
        marginRight: '2.77rem',
        marginBottom: '2.77rem',
      }}
    >
        {heading && (
          <h2
            style={{
              fontSize: '3.32rem',
              fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 500,
              fontStyle: 'normal',
              lineHeight: '1.042',
              letterSpacing: '0',
              paddingTop: '0',
              paddingBottom: '7.11rem',
            }}
          >
            {heading}
          </h2>
        )}

        {featuredPosts && featuredPosts.length > 0 && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            style={{
              gap: '1.42rem',
              paddingBottom: '2.77rem',
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
                    gap: '1.38rem',
                    marginTop: '1.38rem',
                  }}
                >
                  {/* Title */}
                  <h3
                    style={{
                      fontSize: '1.66rem',
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
                        fontSize: '0.97rem',
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
                        fontSize: '0.97rem',
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
            fontSize: '1.66rem',
            fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 500,
            fontStyle: 'normal',
            lineHeight: '1.042',
            letterSpacing: '0',
            paddingTop: '2.81rem',
            paddingBottom: '2.59rem',
          }}
        >
          Read our Blog →
        </Link>
    </section>
  )
}
