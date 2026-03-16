import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { BLOG_POST_QUERY } from '@/sanity/lib/queries'
import BlogPostPage from '@/components/blog/BlogPostPage'
import BlogComingSoon from '@/components/blog/BlogComingSoon'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data: post } = await sanityFetch({ query: BLOG_POST_QUERY, params: { slug } })

  if (!post) notFound()

  const hasBody = post.body && post.body.length > 0

  return hasBody ? <BlogPostPage post={post} /> : <BlogComingSoon />
}
