import BlogPreview from '@/components/sections/BlogPreview';
import Footer from '@/components/layout/Footer';

export default function BlogPage() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh' }}>
      <BlogPreview />
      <Footer />
    </main>
  );
}
