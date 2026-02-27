import { sanityFetch } from "../../sanity/lib/live";
import { PAGE_QUERY } from "../../sanity/lib/queries";
import PageBuilder from "./PageBuilder";

type SanityPageProps = {
  slug: string;
};

export default async function SanityPage({ slug }: SanityPageProps) {
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  });

  if (!page) {
    return (
      <main className="flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Home Page Not Found</h1>
          <p className="text-muted">
            Create a page document in Sanity with slug &quot;home&quot; to get
            started.
          </p>
        </div>
      </main>
    );
  }

  return <PageBuilder blocks={page.pageBuilder} />;
}
