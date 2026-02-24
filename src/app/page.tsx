import { sanityFetch } from '@/sanity/lib/live';
import { PAGE_QUERY } from '@/sanity/lib/queries';
import PageBuilder from '@/components/sanity/PageBuilder';

export default async function Home() {
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug: 'home' },
  });

  if (!page) {
    return (
      <main className="flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Home Page Not Found</h1>
          <p className="text-muted">
            Create a page document in Sanity with slug "home" to get started.
          </p>
        </div>
      </main>
    );
  }

  return <PageBuilder blocks={page.pageBuilder} />;
}
