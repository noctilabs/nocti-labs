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
      className="bg-black text-white pt-[2.34rem] mx-[3rem] mb-[3rem]"
    >
        {heading && (
          <h2 className="text-[3.32rem] font-body font-medium not-italic leading-[1.042] tracking-[0] pt-0 pb-[7.11rem]">
            {heading}
          </h2>
        )}

        {featuredPosts && featuredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1.42rem] pb-[3rem]">
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
                <div className="flex flex-col gap-[1.38rem] mt-[1.38rem]">
                  {/* Title */}
                  <h3 className="text-[1.66rem] font-body font-medium not-italic leading-[1.042] tracking-[0] text-white">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-[0.97rem] font-body font-normal not-italic leading-[1.143] tracking-[0] text-white">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Author */}
                  {post.author && (
                    <p className="text-[0.97rem] font-body font-normal not-italic leading-[1.143] tracking-[0] text-muted">
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
          className="text-white hover:opacity-70 transition inline-block text-[1.66rem] font-body font-medium not-italic leading-[1.042] tracking-[0] pt-[2.81rem] pb-[2.59rem]"
        >
          Read our Blog →
        </Link>
    </section>
  )
}
