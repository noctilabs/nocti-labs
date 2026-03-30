import { sanityFetch } from "../../sanity/lib/live";
import { PAGE_QUERY } from "../../sanity/lib/queries";
import PageBuilder from "./PageBuilder";
import PageNotFound from "@/components/ui/PageNotFound";

type SanityPageProps = {
  slug: string;
};

export default async function SanityPage({ slug }: SanityPageProps) {
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  });

  if (!page) {
    return <PageNotFound />;
  }

  return <PageBuilder blocks={page.pageBuilder} pageSlug={slug} />;
}
