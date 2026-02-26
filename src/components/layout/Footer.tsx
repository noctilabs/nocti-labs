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
    <footer 
      className="text-black relative min-h-[400px] w-full"
      style={{ 
        backgroundColor: '#e9e8e7',
        transform: 'none',
        overflow: 'visible',
        paddingBottom: '40px',
      }}
    >
      <div 
        className="relative z-10"
        style={{
          paddingLeft: 'clamp(20px, 3vw, 40px)',
          paddingRight: 'clamp(20px, 3vw, 40px)',
          paddingTop: '100px',
        }}
      >
        {/* Footer Columns Grid - 5 columns layout */}
        {footerColumns.length > 0 && (
          <div
            className="mb-[100px] mt-[50px]"
            style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr', gap: '0 18px' }}
          >
            {footerColumns.map((col) => {
              const hasLinks = col.links && col.links.length > 0;

              return (
                <div key={col._key}>
                  {col.heading && (
                    <>
                      {hasLinks ? (
                        <h3 className="font-mono uppercase text-[14px] font-bold leading-[18px] mb-0 text-black">
                          {col.heading}
                        </h3>
                      ) : (
                        <Link 
                          href={col.heading === 'BLOG' ? '/blog' : col.heading === 'ABOUT' ? '/about' : '#'}
                          className="font-mono uppercase text-[14px] font-bold leading-[18px] mb-0 text-black hover:opacity-70 transition block"
                        >
                          {col.heading}
                        </Link>
                      )}
                    </>
                  )}
                  {col.links && col.links.length > 0 && (
                    <ul className="mt-0 font-mono text-[14px] font-normal leading-[18px] uppercase text-black">
                      {col.links.map((link) => (
                        <li key={link._key} className="mb-0 leading-[18px]">
                          <Link href={link.href ?? '#'} className="hover:opacity-70 transition">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Large Centered Logo - Full Width */}
      <h2 
        className="font-display font-semibold text-black text-center mb-0 block w-full"
        style={{
          fontSize: 'clamp(80px, 18vw, 9999px)',
          lineHeight: '1',
          transform: 'none',
          marginTop: '200px',
          paddingLeft: 0,
          paddingRight: 0,
          letterSpacing: '-0.02em',
        }}
      >
        {companyName}
      </h2>
    </footer>
  );
}
