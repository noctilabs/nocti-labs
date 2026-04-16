import Footer from '../../../components/layout/Footer'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return (
    <>
      <div data-nav-theme="dark" data-nav-layout-root className="pt-[var(--nav-offset)]">
        {children}
      </div>
      <Footer locale={locale} />
    </>
  )
}
