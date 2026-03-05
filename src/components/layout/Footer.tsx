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
      data-nav-theme="light"
      className="text-black relative w-full"
      style={{
        backgroundColor: '#e9e8e7',
        overflow: 'hidden',
        minHeight: '100vh',
        paddingLeft: 'clamp(20px, 2.77vw, 100vw)',
        paddingRight: 'clamp(20px, 2.77vw, 100vw)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div
        className="relative z-10"
        style={{
          paddingTop: 'clamp(80px, 9.7vw, 100vw)',
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Footer Columns Grid - 5 columns layout */}
        {footerColumns.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '326fr 326fr 210fr 210fr 210fr',
              gap: '0 clamp(12px, 1.38vw, 100vw)',
            }}
          >
            {footerColumns.map((col) => {
              const hasLinks = col.links && col.links.length > 0;

              return (
                <div key={col._key}>
                  {col.heading && (
                    <>
                      {hasLinks ? (
                        <h3
                          style={{
                            fontSize: 'clamp(11px, 0.97vw, 100vw)',
                            fontFamily: 'var(--font-mono), "Courier New", Courier, monospace',
                            fontWeight: 700,
                            fontStyle: 'normal',
                            lineHeight: '1.286',
                            letterSpacing: '0',
                            textTransform: 'uppercase',
                            color: 'black',
                          }}
                        >
                          {col.heading}
                        </h3>
                      ) : (
                        <Link 
                          href={col.heading === 'BLOG' ? '/blog' : col.heading === 'ABOUT' ? '/about' : '#'}
                          className="hover:opacity-70 transition block"
                          style={{
                            fontSize: 'clamp(11px, 0.97vw, 100vw)',
                            fontFamily: 'var(--font-mono), "Courier New", Courier, monospace',
                            fontWeight: 700,
                            fontStyle: 'normal',
                            lineHeight: '1.286',
                            letterSpacing: '0',
                            textTransform: 'uppercase',
                            color: 'black',
                          }}
                        >
                          {col.heading}
                        </Link>
                      )}
                    </>
                  )}
                  {col.links && col.links.length > 0 && (
                    <ul
                      style={{
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                        fontSize: 'clamp(11px, 0.97vw, 100vw)',
                        fontFamily: 'var(--font-mono), "Courier New", Courier, monospace',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        lineHeight: '1.286',
                        letterSpacing: '0',
                        textTransform: 'uppercase',
                        color: 'black',
                      }}
                    >
                      {col.links.map((link) => (
                        <li key={link._key}>
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
        style={{
          fontSize: 'clamp(80px, 20.2vw, 100vw)',
          fontFamily: 'var(--font-display), "Helvetica Neue", Helvetica, Arial, sans-serif',
          fontWeight: 500,
          fontStyle: 'normal',
          lineHeight: '0.305',
          letterSpacing: '0',
          color: 'black',
          textAlign: 'center',
          width: '100%',
          marginTop: 'clamp(100px, 16vw, 100vw)',
          paddingBottom: 'clamp(45px, 6.23vw, 100vw)',
        }}
      >
        {companyName}
      </h2>
    </footer>
  );
}
