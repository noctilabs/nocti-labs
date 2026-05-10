import Link from 'next/link'
import Image from 'next/image'
import { getLocale } from 'next-intl/server'
import { urlFor } from '@/sanity/lib/image'
import { heading as headingCls } from '@/lib/typography'
import type { PAGE_QUERY_RESULT } from '../../../../sanity.types'
import BlogComingSoon from '@/components/blog/BlogComingSoon'

type PageBlock = NonNullable<NonNullable<PAGE_QUERY_RESULT>['pageBuilder']>[number]
type SanityInsightsGridProps = Extract<PageBlock, { _type: 'insightsGrid' }>

export default async function SanityInsightsGrid({
  heading,
  featuredPosts,
}: SanityInsightsGridProps) {
  const locale = await getLocale()
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
              <Link key={post._id} href={`/${locale}/blog/${post.slug?.current}`} className="group flex flex-col">
                {post.coverImage?.asset?._ref ? (
                  <Image
                    src={urlFor(post.coverImage).width(326).height(221).url()}
                    alt={post.title || ''}
                    width={326}
                    height={221}
                    className="w-full object-cover rounded-[1rem]"
                  />
                ) : (
                  <div className="w-full aspect-square bg-gray-800 rounded-[1rem]" />
                )}

                <div className="flex flex-col gap-[1.3rem] mt-[2rem]">
                  {post.author && (
                    <p className="font-body font-normal text-[1.12rem] leading-[1.28rem] m-0 text-[#a8a8a8] uppercase tracking-wide">
                      {post.author}
                    </p>
                  )}
                  <h3 className="font-body font-medium text-[1.92rem] leading-[2rem] m-0">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden md:block pt-[2.34rem] mx-section-x mb-[3rem]">
        {heading && (
          <h2 className={`${headingCls} pt-0 pb-[4rem]`}>
            {heading}
          </h2>
        )}

        {featuredPosts && featuredPosts.length > 0 && (
          <div className="grid grid-cols-3 gap-[1.42rem] pb-[3rem]">
            {featuredPosts.map((post) => (
              <Link key={post._id} href={`/${locale}/blog/${post.slug?.current}`} className="group flex flex-col">
                {post.coverImage?.asset?._ref ? (
                  <Image
                    src={urlFor(post.coverImage).width(522).height(354).url()}
                    alt={post.title || ''}
                    width={522}
                    height={354}
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="w-full h-auto object-cover rounded-[1rem] group-hover:opacity-80 transition"
                  />
                ) : (
                  <div className="w-[90%] aspect-square bg-gray-800 rounded-[1rem] group-hover:opacity-80 transition" />
                )}
                <div className="flex flex-col gap-[1.38rem] mt-[1.38rem] w-[90%]">
                  <div className="flex items-center justify-between">
                    {post.author && (
                      <p className="font-body font-normal text-[1.12rem] leading-[1.28rem] m-0 text-[#a8a8a8] uppercase tracking-wide">
                        {post.author}
                      </p>
                    )}
                  </div>
                  <h3 className="font-body font-medium text-[2.4rem] leading-[2.5rem] m-0 text-white">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
