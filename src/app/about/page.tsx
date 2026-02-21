import PersistentNav from '@/components/layout/PersistentNav';
import About from '@/components/sections/About';
import Values from '@/components/sections/Values';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh' }}>
      <PersistentNav />
      <About />
      <Values />
      <Footer />
    </main>
  );
}
