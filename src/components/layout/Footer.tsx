import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/live';
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries';
import type { SITE_SETTINGS_QUERYResult } from '../../../sanity.types';

type FooterColumn = NonNullable<NonNullable<SITE_SETTINGS_QUERYResult>['footerColumns']>[number]

const colClass = "text-[0.97rem] font-mono leading-[1.286] tracking-[0] uppercase text-black";

export default async function Footer() {
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });

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
              href={col.heading === 'BLOG' ? '/blog' : col.heading === 'ABOUT' ? '/about' : '#'}
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
      className="text-black relative w-full bg-footer h-screen overflow-hidden px-section-x flex flex-col"
    >
      <div className="relative z-10 pt-[11.3rem]">
        {/* Footer columns — all 5 columns in a row, matching Figma layout */}
        {footerColumns.length > 0 && (
          <div
            className="grid gap-[1.38rem] items-start w-full"
            style={{
              gridTemplateColumns: `repeat(${footerColumns.length}, minmax(min-content, 1fr))`,
            }}
          >
            {renderColumns(footerColumns)}
          </div>
        )}
      </div>

      {/* Large wordmark */}
      <h2 className="text-[20.2vw] font-display font-medium leading-[0.85] tracking-[-0.02em] text-black text-center w-full whitespace-nowrap mt-auto pb-[1.56rem]">
        {companyName}
      </h2>
    </footer>
  );
}
