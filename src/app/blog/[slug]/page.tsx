import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { BLOG_POST_QUERY } from '@/sanity/lib/queries'
import BlogPostPage from '@/components/blog/BlogPostPage'
import BlogComingSoon from '@/components/blog/BlogComingSoon'
import type { BlogPost } from '../../../../sanity.types'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await client.fetch<BlogPost | null>(BLOG_POST_QUERY, { slug })

  if (!post) notFound()

  const hasBody = post.body && post.body.length > 0

  return hasBody ? <BlogPostPage post={post} /> : <BlogComingSoon />
}
