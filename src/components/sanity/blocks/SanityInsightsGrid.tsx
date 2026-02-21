import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface BlogPostDoc {
  _id: string
  title?: string
  slug?: { current?: string }
  coverImage?: { asset?: { _ref: string } }
  excerpt?: string
  author?: string
  publishedAt?: string
}

interface SanityInsightsGridProps {
  _key: string
  heading?: string
  featuredPosts?: BlogPostDoc[]
}

export default function SanityInsightsGrid({
  heading,
  featuredPosts,
}: SanityInsightsGridProps) {
  return (
    <section className="bg-black text-white py-20 px-8 md:px-16">
      {heading && (
        <h2 className="font-body text-[48px] font-bold mb-16">{heading}</h2>
      )}

      {featuredPosts && featuredPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredPosts.map((post) => (
            <div key={post._id} className="group cursor-pointer">
              {/* Cover Image */}
              {post.coverImage?.asset?._ref ? (
                <img
                  src={urlFor(post.coverImage).width(400).height(400).url()}
                  alt={post.title || ''}
                  className="w-full aspect-square object-cover rounded-lg mb-6 group-hover:opacity-80 transition"
                />
              ) : (
                <div className="w-full aspect-square bg-gray-800 rounded-lg mb-6 group-hover:opacity-80 transition" />
              )}

              {/* Title */}
              <h3 className="font-body text-[24px] font-bold mb-4 group-hover:opacity-70 transition">
                {post.title}
              </h3>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="font-body text-[14px] text-white opacity-70 mb-4">
                  {post.excerpt}
                </p>
              )}

              {/* Author */}
              {post.author && (
                <p className="font-body text-[14px] text-muted">
                  {post.author}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <Link
        href="/blog"
        className="font-body text-[24px] text-white hover:opacity-70 transition"
      >
        Read our Blog &rarr;
      </Link>
    </section>
  )
}
