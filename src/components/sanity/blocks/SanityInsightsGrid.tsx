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
      className="bg-black text-white pt-[94px] mb-[40px]"
      style={{
        marginLeft: 'clamp(20px, 3vw, 40px)',
        marginRight: 'clamp(20px, 3vw, 40px)',
        paddingLeft: '0px',
        paddingRight: '0px',
        marginBottom: '40px',
      }}
    >
        {heading && (
          <h2 
            className="font-display text-[48px] font-medium leading-[50px] mb-[103px]"
            style={{ paddingTop: '40px', paddingBottom: '100px' }}
          >
            {heading}
          </h2>
        )}

        {featuredPosts && featuredPosts.length > 0 && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] mb-[40px]"
            style={{ paddingBottom: '40px' }}
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
                    className="w-full aspect-[326/221] object-cover mb-[20px] group-hover:opacity-80 transition"
                  />
                ) : (
                  <div className="w-full aspect-[326/221] bg-gray-800 mb-[20px] group-hover:opacity-80 transition" />
                )}

                {/* Text content */}
                <div
                  className="flex flex-col gap-[13px]"
                  style={{ marginTop: '30px', marginBottom: '30px' }}
                >
                  {/* Title */}
                  <h3 className="font-body text-[24px] font-medium leading-[25px] text-white"
                    style={{ marginBottom: '10px' }}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="font-body text-[14px] font-normal leading-[16px] text-white">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Author */}
                  {post.author && (
                    <p className="font-body text-[14px] font-normal leading-[16px] text-[#A8A8A8]">
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
          className="font-body text-[24px] font-medium leading-[25px] text-white hover:opacity-70 transition"
        >
          Read our Blog →
        </Link>
    </section>
  )
}
