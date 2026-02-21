import Navbar from '@/components/layout/Navbar';
import BlogPreview from '@/components/sections/BlogPreview';
import Footer from '@/components/layout/Footer';

export default function BlogPage() {
  return (
    <main>
      <Navbar theme="dark" />
      <div className="pt-20">
        <BlogPreview />
      </div>
      <Footer />
    </main>
  );
}
