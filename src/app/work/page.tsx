import Navbar from '@/components/layout/Navbar';
import WorkPreview from '@/components/sections/WorkPreview';
import Footer from '@/components/layout/Footer';

export default function WorkPage() {
  return (
    <main>
      <Navbar theme="dark" />
      <div className="pt-20">
        <WorkPreview />
      </div>
      <Footer />
    </main>
  );
}
