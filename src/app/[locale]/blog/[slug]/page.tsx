import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { BLOG_POST_QUERY } from '@/sanity/lib/queries'
import BlogPostPage from '@/components/blog/BlogPostPage'
import BlogComingSoon from '@/components/blog/BlogComingSoon'
import type { BlogPost } from '../../../../../sanity.types'

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const post = await client.fetch<BlogPost | null>(BLOG_POST_QUERY, { slug, locale })

  if (!post) notFound()

  const hasBody = post.body && post.body.length > 0

  return hasBody ? <BlogPostPage post={post} /> : <BlogComingSoon />
}
