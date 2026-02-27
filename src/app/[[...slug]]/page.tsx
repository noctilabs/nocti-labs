import SanityPage from "../../components/sanity/SanityPage";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  return <SanityPage slug={!slug ? "home" : slug.join("/")} />;
}
