import Navbar from '@/components/layout/Navbar';
import About from '@/components/sections/About';
import Values from '@/components/sections/Values';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <main>
      <Navbar theme="dark" />
      <div className="pt-20">
        <About />
        <Values />
      </div>
      <Footer />
    </main>
  );
}
