import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/live';
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries';
import type { SITE_SETTINGS_QUERYResult } from '../../../sanity.types';

type FooterColumn = NonNullable<NonNullable<SITE_SETTINGS_QUERYResult>['footerColumns']>[number]

export default async function Footer() {
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });

  const footerColumns: FooterColumn[] = settings?.footerColumns ?? [];
  const companyName: string = settings?.companyName ?? 'Nocti Labs';

  const colStyle: React.CSSProperties = {
    fontSize: '0.97rem',
    fontFamily: 'var(--font-mono), "Courier New", Courier, monospace',
    lineHeight: '1.286',
    letterSpacing: '0',
    textTransform: 'uppercase',
    color: 'black',
  };

  const renderColumns = (cols: FooterColumn[]) => cols.map((col) => {
    const hasLinks = col.links && col.links.length > 0;
    return (
      <div key={col._key}>
        {col.heading && (
          hasLinks ? (
            <h3 style={{ ...colStyle, fontWeight: 700 }}>{col.heading}</h3>
          ) : (
            <Link
              href={col.heading === 'BLOG' ? '/blog' : col.heading === 'ABOUT' ? '/about' : '#'}
              className="hover:opacity-70 transition block"
              style={{ ...colStyle, fontWeight: 700 }}
            >
              {col.heading}
            </Link>
          )
        )}
        {col.links && col.links.length > 0 && (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, ...colStyle, fontWeight: 400 }}>
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
  });

  return (
    <footer
      data-nav-theme="light"
      className="text-black relative w-full"
      style={{
        backgroundColor: '#e9e8e7',
        height: '100vh',
        overflow: 'hidden',
        paddingLeft: '3rem',
        paddingRight: '3rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        className="relative z-10"
        style={{
          paddingTop: '11.3rem',
        }}
      >
        {/* Footer columns — all 5 columns in a row, matching Figma layout */}
        {footerColumns.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${footerColumns.length}, minmax(min-content, 1fr))`,
              gap: '1.38rem',
              alignItems: 'start',
              width: '100%',
            }}
          >
            {renderColumns(footerColumns)}
          </div>
        )}
      </div>

      {/* Large wordmark */}
      <h2
        style={{
          fontSize: '20.2vw',
          fontFamily: 'var(--font-display), "Helvetica Neue", Helvetica, Arial, sans-serif',
          fontWeight: 500,
          lineHeight: '0.85',
          letterSpacing: '-0.02em',
          color: 'black',
          textAlign: 'center',
          width: '100%',
          whiteSpace: 'nowrap',
          marginTop: 'auto',
          paddingBottom: '1.56rem',
        }}
      >
        {companyName}
      </h2>
    </footer>
  );
}
