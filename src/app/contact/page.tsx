import Navbar from '@/components/layout/Navbar';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  return (
    <main>
      <Navbar theme="dark" />
      <div className="pt-20">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
