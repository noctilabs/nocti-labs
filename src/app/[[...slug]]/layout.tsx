import Footer from "../../components/layout/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div data-nav-theme="dark" style={{ paddingTop: 'var(--nav-offset)' }}>{children}</div>
      <Footer />
    </>
  );
}
