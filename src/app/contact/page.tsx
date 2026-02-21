import PersistentNav from '@/components/layout/PersistentNav';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh' }}>
      <PersistentNav />
      <Contact />
      <Footer />
    </main>
  );
}
