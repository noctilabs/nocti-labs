import PersistentNav from '@/components/layout/PersistentNav';
import WorkPreview from '@/components/sections/WorkPreview';
import Footer from '@/components/layout/Footer';

export default function WorkPage() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh' }}>
      <section style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
        <PersistentNav />
        <WorkPreview />
      </section>
      <Footer />
    </main>
  );
}
