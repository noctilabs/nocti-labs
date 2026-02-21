import Navbar from '@/components/layout/Navbar';
import ServicesDetail from '@/components/sections/ServicesDetail';
import Footer from '@/components/layout/Footer';

export default function ServicesPage() {
  return (
    <main>
      <Navbar theme="dark" />
      <div className="pt-20">
        <ServicesDetail />
      </div>
      <Footer />
    </main>
  );
}
