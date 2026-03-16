import Link from 'next/link'
import Image from 'next/image'
import { createDataAttribute } from '@sanity/visual-editing'
import { urlFor } from '@/sanity/lib/image'
import { heading as headingCls, subheading, caption } from '@/lib/typography'
import type { PAGE_QUERYResult } from '../../../../sanity.types'

type PageBlock = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>[number]
type SanityInsightsGridProps = Extract<PageBlock, { _type: 'insightsGrid' }> & {
  documentId?: string
}

export default function SanityInsightsGrid({
  heading,
  featuredPosts,
  _key,
  documentId,
}: SanityInsightsGridProps) {
  const attr = (path: string) =>
    documentId
      ? { 'data-sanity': createDataAttribute({ id: documentId, type: 'page', path: `pageBuilder[_key=="${_key}"].${path}` }).toString() }
      : {}
  return (
    <section
      data-nav-theme="dark"
      className="bg-black text-white pt-[2.34rem] mx-section-x mb-[3rem]"
    >
        {heading && (
          <h2 className={`${headingCls} pt-0 pb-[7.11rem]`} {...attr('heading')}>
            {heading}
          </h2>
        )}

        {featuredPosts && featuredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1.42rem] pb-[3rem]">
            {featuredPosts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug?.current}`} className="group flex flex-col">
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
                <div className="flex flex-col gap-[1.38rem] mt-[1.38rem]">
                  {/* Title */}
                  <h3 className={subheading}>
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className={caption}>
                      {post.excerpt}
                    </p>
                  )}

                  {/* Author */}
                  {post.author && (
                    <p className={`${caption} text-muted`}>
                      {post.author}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        <Link
          href="/blog"
          className={`${subheading} text-white hover:opacity-70 transition inline-block pt-[2.81rem] pb-[2.59rem]`}
        >
          Read our Blog →
        </Link>
    </section>
  )
}
