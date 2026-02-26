import ServicesDetail from '@/components/sections/ServicesDetail';
import Footer from '@/components/layout/Footer';

export default function ServicesPage() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh' }}>
      <ServicesDetail />
      <Footer />
    </main>
  );
}
