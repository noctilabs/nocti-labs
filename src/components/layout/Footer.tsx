'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-footer text-black relative overflow-hidden">
      {/* Large Background Text */}
      <div className="absolute bottom-0 right-0 text-[280px] font-display font-bold opacity-10 leading-none pointer-events-none">
        Nocti Labs
      </div>

      <div className="relative z-10 px-8 py-16">
        {/* Top Navigation Strip */}
        <div className="flex items-center justify-between mb-16 pb-8 border-b border-black border-opacity-20">
          <Link href="/" className="bg-black text-white px-6 py-2 rounded-full text-[16px] font-display font-bold">
            Nocti Labs
          </Link>
          
          <div className="hidden md:flex font-mono uppercase text-[14px] gap-8 text-black">
            <Link href="/work">Work</Link>
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/blog">Blog</Link>
          </div>

          <Link
            href="/contact"
            className="bg-black text-white px-6 py-2 rounded-full font-mono uppercase text-[14px] font-bold"
          >
            Contact Us →
          </Link>
        </div>

        {/* Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Services Column */}
          <div>
            <h3 className="font-mono uppercase text-[14px] font-bold mb-6 text-black">Services</h3>
            <ul className="space-y-3 font-mono text-[12px] uppercase text-black opacity-70">
              <li><Link href="#" className="hover:opacity-100 transition">AI Native Commerce Engineering</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">Medusa Development</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">Marketplace Development</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">B2C Commerce</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">B2B2C Commerce</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">D2C Commerce</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">AI & Automation</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">Systems Design and UI Systems</Link></li>
            </ul>
          </div>

          {/* Industries Column */}
          <div>
            <h3 className="font-mono uppercase text-[14px] font-bold mb-6 text-black">Industries</h3>
            <ul className="space-y-3 font-mono text-[12px] uppercase text-black opacity-70">
              <li><Link href="#" className="hover:opacity-100 transition">Retail & Fashion</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">Food & Beverages</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">Consumer Goods / CPG</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">Beauty & Cosmetic</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">Rental / Services</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">Travel & Hospitality</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">Media & Entertainment</Link></li>
            </ul>
          </div>

          {/* Insights & About */}
          <div>
            <h3 className="font-mono uppercase text-[14px] font-bold mb-6 text-black">Insights</h3>
            <ul className="space-y-3 font-mono text-[12px] uppercase text-black opacity-70">
              <li><Link href="/blog" className="hover:opacity-100 transition">Blog</Link></li>
            </ul>
            <h3 className="font-mono uppercase text-[14px] font-bold mb-6 mt-8 text-black">About</h3>
            <ul className="space-y-3 font-mono text-[12px] uppercase text-black opacity-70">
              <li><Link href="/about" className="hover:opacity-100 transition">Our Story</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-mono uppercase text-[14px] font-bold mb-6 text-black">Connect</h3>
            <ul className="space-y-3 font-mono text-[12px] uppercase text-black opacity-70">
              <li><Link href="/contact" className="hover:opacity-100 transition">Let's Talk</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">LinkedIn</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">Instagram</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">Events</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition">Careers</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="border-t border-black border-opacity-20 pt-8 font-mono text-[12px] text-black opacity-60">
          <p>© 2026 Nocti Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
