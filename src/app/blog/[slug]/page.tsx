import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { BLOG_POST_QUERY } from '@/sanity/lib/queries'
import BlogPostPage from '@/components/blog/BlogPostPage'
import type { BlogPost } from '../../../../sanity.types'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await client.fetch<BlogPost | null>(BLOG_POST_QUERY, { slug })

  if (!post) notFound()

  return <BlogPostPage post={post} />
}
