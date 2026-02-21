'use client';

import Link from 'next/link';

const blogPosts = [
  {
    title: 'Mercado Pago API integration for LATAM',
    excerpt: 'At Nocti Labs we\'ve been working on the integration between Medusa and Mercado Pago...',
    author: 'Nicolas Gorga',
  },
  {
    title: 'How Consumers Actually Shopped This BFCM',
    excerpt: 'At Nocti Labs we\'ve been working on the integration between Medusa and Mercado Pago...',
    author: 'Nicolas Gorga',
  },
  {
    title: 'Black Friday, Now Run by AI',
    excerpt: 'At Nocti Labs we\'ve been working on the integration between Medusa and Mercado Pago...',
    author: 'Nicolas Gorga',
  },
  {
    title: 'Mercado Pago API integration for LATAM',
    excerpt: 'At Nocti Labs we\'ve been working on the integration between Medusa and Mercado Pago...',
    author: 'Nicolas Gorga',
  },
];

export default function BlogPreview() {
  return (
    <section className="bg-black text-white py-20 px-8 md:px-16" data-nav-theme="dark">
      {/* Label */}
      <h2 className="font-body text-[48px] font-bold mb-16">Insights</h2>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {blogPosts.map((post, idx) => (
          <div key={idx} className="group cursor-pointer">
            {/* Image Placeholder */}
            <div className="w-full aspect-square bg-gray-800 rounded-lg mb-6 group-hover:opacity-80 transition"></div>

            {/* Title */}
            <h3 className="font-body text-[24px] font-bold mb-4 group-hover:opacity-70 transition">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="font-body text-[14px] text-white opacity-70 mb-4">
              {post.excerpt}
            </p>

            {/* Author */}
            <p className="font-body text-[14px] text-muted">
              {post.author}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Link */}
      <Link href="/blog" className="font-body text-[24px] text-white hover:opacity-70 transition">
        Read our Blog →
      </Link>
    </section>
  );
}
