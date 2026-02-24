import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/live';
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries';
import type { SITE_SETTINGS_QUERYResult } from '../../../sanity.types';

type FooterColumn = NonNullable<NonNullable<SITE_SETTINGS_QUERYResult>['footerColumns']>[number]

export default async function Footer() {
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });

  const footerColumns: FooterColumn[] = settings?.footerColumns ?? [];
  const companyName: string = settings?.companyName ?? 'Nocti Labs';

  return (
    <footer className="bg-footer text-black relative overflow-hidden">
      {/* Large Background Text */}
      <div className="absolute bottom-0 right-0 text-[280px] font-display font-bold opacity-10 leading-none pointer-events-none">
        {companyName}
      </div>

      <div className="relative z-10 px-8 py-16">
        {/* Top Navigation Strip */}
        <div className="flex items-center justify-between mb-16 pb-8 border-b border-black border-opacity-20">
          <Link href="/" className="bg-black text-white px-6 py-2 rounded-full text-[16px] font-display font-bold">
            {companyName}
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

        {/* Sitemap Grid — driven by Sanity footerColumns */}
        {footerColumns.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {footerColumns.map((col) => (
              <div key={col._key}>
                {col.heading && (
                  <h3 className="font-mono uppercase text-[14px] font-bold mb-6 text-black">
                    {col.heading}
                  </h3>
                )}
                <ul className="space-y-3 font-mono text-[12px] uppercase text-black opacity-70">
                  {col.links?.map((link) => (
                    <li key={link._key}>
                      <Link href={link.href ?? '#'} className="hover:opacity-100 transition">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Info */}
        <div className="border-t border-black border-opacity-20 pt-8 font-mono text-[12px] text-black opacity-60">
          <p>© 2026 {companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
