import PersistentNav from '@/components/layout/PersistentNav';
import WorkPreview from '@/components/sections/WorkPreview';
import Footer from '@/components/layout/Footer';

export default function WorkPage() {
  return (
    <main style={{ position: 'relative' }}>
      <section style={{ position: 'relative', width: '100%' }}>
        <PersistentNav />
        <WorkPreview />
      </section>
      <Footer />
    </main>
  );
}
