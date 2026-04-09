import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { heading as headingCls, subheading, caption } from '@/lib/typography'
import type { PAGE_QUERYResult } from '../../../../sanity.types'
import BlogComingSoon from '@/components/blog/BlogComingSoon'

type PageBlock = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>[number]
type SanityInsightsGridProps = Extract<PageBlock, { _type: 'insightsGrid' }>

export default function SanityInsightsGrid({
  heading,
  featuredPosts,
}: SanityInsightsGridProps) {
  const isEmpty = !featuredPosts || featuredPosts.length === 0

  if (isEmpty) {
    return (
      <section data-nav-theme="dark" className="bg-black text-white" style={{ paddingBottom: '18.5rem' }}>
        <div className="hidden md:block pt-[2.34rem] mx-section-x">
          {heading && <h2 className={`${headingCls} pt-0 pb-[7.11rem]`}>{heading}</h2>}
        </div>
        <div className="md:hidden pt-[4.5rem] px-[1.4rem]">
          {heading && <h2 className="font-body font-medium text-[4.4rem] leading-[5rem] m-0 mb-[3.8rem]">{heading}</h2>}
        </div>
        <BlogComingSoon hideWrapper />
      </section>
    )
  }

  return (
    <section
      data-nav-theme="dark"
      className="bg-black text-white min-h-screen"
    >
      {/* ── MOBILE LAYOUT ── */}
      <div className="md:hidden pt-[4.5rem] pb-[3.4rem]">
        {heading && (
          <h2 className="font-body font-medium text-[4.4rem] leading-[5rem] m-0 mb-[3.8rem] px-[1.4rem]">
            {heading}
          </h2>
        )}

        {featuredPosts && featuredPosts.length > 0 && (
          <div className="flex flex-col gap-[2rem] px-[3.8rem]">
            {featuredPosts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug?.current}`} className="group flex flex-col">
                {/* Cover Image */}
                {post.coverImage?.asset?._ref ? (
                  <Image
                    src={urlFor(post.coverImage).width(326).height(221).url()}
                    alt={post.title || ''}
                    width={326}
                    height={221}
                    className="w-full object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[326/221] bg-gray-800" />
                )}

                {/* Text content */}
                <div className="flex flex-col gap-[1.3rem] mt-[2rem]">
                  <h3 className="font-body font-medium text-[2.4rem] leading-[2.5rem] m-0">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="font-body font-normal text-[1.4rem] leading-[1.6rem] m-0">
                      {post.excerpt}
                    </p>
                  )}
                  {post.author && (
                    <p className="font-body font-normal text-[1.4rem] leading-[1.6rem] m-0 text-[#a8a8a8]">
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
          className="font-body font-medium text-[2.4rem] leading-[2.5rem] text-white hover:opacity-70 transition inline-block mt-[4rem] px-[3.8rem]"
        >
          Read our Blog →
        </Link>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden md:block pt-[2.34rem] mx-section-x mb-[3rem]">
        {heading && (
          <h2 className={`${headingCls} pt-0 pb-[7.11rem]`}>
            {heading}
          </h2>
        )}

        {featuredPosts && featuredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1.42rem] pb-[3rem]">
            {featuredPosts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug?.current}`} className="group flex flex-col">
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
                <div className="flex flex-col gap-[1.38rem] mt-[1.38rem]">
                  <h3 className={subheading}>{post.title}</h3>
                  {post.excerpt && <p className={caption}>{post.excerpt}</p>}
                  {post.author && <p className={`${caption} text-muted`}>{post.author}</p>}
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
      </div>
    </section>
  )
}
