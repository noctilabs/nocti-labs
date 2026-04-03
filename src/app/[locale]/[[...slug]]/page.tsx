import SanityPage from '../../../components/sanity/SanityPage'

export const dynamic = 'force-dynamic'

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>
}) {
  const { locale, slug } = await params

  return <SanityPage slug={!slug ? 'home' : slug.join('/')} locale={locale} />
}
