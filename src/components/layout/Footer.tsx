import { Link } from '@/i18n/navigation';
import { client } from '@/sanity/lib/client';
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries';
import type { SITE_SETTINGS_QUERY_RESULT } from '../../../sanity.types';

type FooterColumn = NonNullable<NonNullable<SITE_SETTINGS_QUERY_RESULT>['footerColumns']>[number]

const colClass = "text-[0.875rem] font-mono leading-[1.643] tracking-[0] uppercase text-black";

function resolveFooterHref(href?: string | null, heading?: string | null): string {
  if (href && href.trim()) {
    return href;
  }

  if (heading === 'BLOG') return '/blog';
  if (heading === 'ABOUT') return '/about';

  return '#';
}

export default async function Footer({ locale }: { locale: string }) {
  const settings = await client.fetch<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY, { locale }, { next: { revalidate: 60 } });

  const footerColumns: FooterColumn[] = settings?.footerColumns ?? [];
  const companyName: string = settings?.companyName ?? 'Nocti Labs';

  const renderColumns = (cols: FooterColumn[]) => cols.map((col) => {
    const hasLinks = col.links && col.links.length > 0;
    return (
      <div key={col._key}>
        {col.heading && (
          hasLinks ? (
            <h3 className={`${colClass} font-bold`}>{col.heading}</h3>
          ) : (
            <Link
              href={resolveFooterHref(undefined, col.heading)}
              className={`${colClass} font-bold hover:opacity-70 transition block`}
            >
              {col.heading}
            </Link>
          )
        )}
        {col.links && col.links.length > 0 && (
          <ul className={`${colClass} font-normal list-none m-0 p-0`}>
            {col.links.map((link) => (
              <li key={link._key}>
                <Link href={resolveFooterHref(link.href, link.label)} className="hover:opacity-70 transition">
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
      data-nav-footer-reveal
      data-nav-theme="light"
      className="text-black relative w-full h-screen overflow-hidden px-section-x flex flex-col"
      style={{ background: 'linear-gradient(to bottom, #e9e8e7 0%, #1500ff 100%)' }}
    >
      <div className="relative z-10 pt-[10.5rem]">
        {/* Footer columns — all 5 columns in a row, matching Figma layout */}
        {footerColumns.length > 0 && (
          <div
            className="grid items-start w-full"
            style={{
              gridTemplateColumns: '26.4fr 26.4fr 17fr 17fr 17fr',
              columnGap: '1.4vw',
            }}
          >
            {renderColumns(footerColumns)}
          </div>
        )}
      </div>

      {/* Large wordmark — absolute, bottom-aligned with small gap matching Figma */}
      <h2 className="absolute bottom-[0] left-0 w-full text-[21vw] font-display font-medium leading-none tracking-[-0.02em] text-black text-center whitespace-nowrap">
        {companyName}
      </h2>
    </footer>
  );
}
