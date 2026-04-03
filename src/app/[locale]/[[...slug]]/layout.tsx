import Footer from '../../../components/layout/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div data-nav-theme="dark" data-nav-layout-root className="pt-[var(--nav-offset)]">
        {children}
      </div>
      <Footer />
    </>
  )
}
