import { sanityFetch } from '@/sanity/lib/live'
import { PAGE_QUERY } from '@/sanity/lib/queries'
import PageBuilder from '@/components/sanity/PageBuilder'
import Footer from '@/components/layout/Footer'

export default async function TestHomeSanityPage() {
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug: 'home' },
  })

  if (!page) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-body text-[48px] font-bold mb-4">
            No page found
          </h1>
          <p className="font-body text-[18px] text-muted">
            Create a page with slug &quot;home&quot; in Sanity Studio at{' '}
            <a href="/studio" className="text-accent underline">
              /studio
            </a>
          </p>
        </div>
      </main>
    )
  }

  return (
    <>
      <PageBuilder blocks={page.pageBuilder} />
      <Footer />
    </>
  )
}
