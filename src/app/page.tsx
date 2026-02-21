import Hero from '@/components/sections/Hero';
import ServicesPreview from '@/components/sections/ServicesPreview';
import WorkPreview from '@/components/sections/WorkPreview';
import BlogPreview from '@/components/sections/BlogPreview';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesPreview />
      <WorkPreview />
      <BlogPreview />
      <Contact />
      <Footer />
    </main>
  );
}
