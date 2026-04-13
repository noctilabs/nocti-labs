"use client";

import Image from "next/image";
import SanityCta from "@/components/sanity/shared/SanityCta";
import type { PAGE_QUERY_RESULT } from "../../../../sanity.types";

type PageBlock = NonNullable<
  NonNullable<PAGE_QUERY_RESULT>["pageBuilder"]
>[number];
type SanityServicesShowcaseProps = Extract<
  PageBlock,
  { _type: "servicesShowcase" }
> & {
  tagline?: string;
  pageSlug?: string;
};

function ArrowIcon({ className, invert }: { className?: string; invert?: boolean }) {
  return (
    <Image
      src="/servicesArrowIcon.svg"
      alt=""
      width={36}
      height={36}
      className={`${className ?? ""}${invert ? " invert" : ""}`}
      aria-hidden
    />
  );
}

export default function SanityServicesShowcase({
  heading,
  tagline,
  services,
  cta,
  pageSlug,
}: SanityServicesShowcaseProps) {
  const isHome = pageSlug === "home";
  const isServices = pageSlug === "services";
  const hasLightTheme = isHome || isServices;

  const sectionBg = hasLightTheme ? "bg-white text-black" : "bg-black text-white";
  const borderColor = hasLightTheme ? "border-black" : "border-white";
  const ctaTextColor = hasLightTheme ? "text-black" : "text-white";

  return (
    <section
      data-nav-theme={hasLightTheme ? "light" : "dark"}
      className={`${sectionBg} flex flex-col relative min-h-screen${pageSlug === "services" ? " mt-[calc(-1*var(--nav-offset))]" : ""}`}
      suppressHydrationWarning
    >
      {/* ── MOBILE LAYOUT ── */}
      <div className={`md:hidden px-[1.4rem] pb-[3.4rem] flex flex-col${pageSlug === "services" ? " pt-[calc(var(--nav-offset)+4.5rem)]" : " pt-[4.5rem]"}`}>
        {/* Heading */}
        {heading && (
          <h2 className="font-body font-medium text-[4.4rem] leading-[5rem] m-0 mb-[4rem]">
            {heading}
          </h2>
        )}

        {/* Tagline */}
        {tagline && (
          <div className="font-body font-medium text-[3.2rem] leading-[3.7rem] mb-[7.8rem]">
            {tagline.split('\n').filter(Boolean).map((line, i) => (
              <p key={i} className="m-0 mb-[3.7rem] last:mb-0">{line}</p>
            ))}
          </div>
        )}

        {/* Services — plain list with dividers, no accordion */}
        {services && services.length > 0 && (
          <div className="flex flex-col">
            <div className={`border-t-2 ${borderColor}`} />
            {services.map((service) => (
              <div key={service._id}>
                {isHome ? (
                  <a
                    href={`/services#${service._id}`}
                    className="font-body font-medium text-[3.2rem] leading-[3.7rem] py-[2.25rem] block hover:opacity-70 transition-opacity"
                  >
                    {service.title}
                  </a>
                ) : (
                  <div className="font-body font-medium text-[3.2rem] leading-[3.7rem] py-[2.25rem]">
                    {service.title}
                  </div>
                )}
                <div className={`border-t-2 ${borderColor}`} />
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {cta && (
          <div className="mt-[3rem]">
            <SanityCta {...cta} className={`${ctaTextColor} font-body font-medium text-[2.4rem] leading-[2.5rem]`} />
          </div>
        )}
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className={`hidden md:block w-full relative px-section-x pb-[2rem]${pageSlug === "services" ? " pt-[calc(var(--nav-offset)+2.375rem)]" : " pt-[2.375rem]"}`}>
        {/* Heading and Tagline */}
        <div className="flex items-start mb-[5rem]">
          {heading && (
            <h2 className="font-body font-medium text-[3rem] leading-[3.125rem] w-1/2 shrink-0">
              {heading}
            </h2>
          )}
          {tagline && (
            <div className="font-body text-[2rem] leading-[2.3125rem] not-italic font-[500] w-[42rem]">
              {tagline.split('\n').filter(Boolean).map((line, i) => (
                <p key={i} className="m-0">{line}</p>
              ))}
            </div>
          )}
        </div>

        {/* Services List */}
        {services && services.length > 0 && (
          <div className="flex flex-col">
            {services.map((service, index) => {
              const isFirst = index === 0;
              const rowClass = `font-body font-medium text-[3rem] leading-[3.125rem] py-[1.5625rem] flex items-center border-b-[4px] ${borderColor} ${isFirst ? 'border-t-[4px]' : ''}`;

              const href = isServices
                ? `#${service._id}`
                : `/services#${service._id}`;
              return (
                <div key={service._id}>
                  <a
                    href={href}
                    className={`${rowClass} hover:opacity-70 transition-opacity duration-300`}
                  >
                    <span className="w-[38rem] shrink-0">{service.title}</span>
                    <ArrowIcon invert={!hasLightTheme} />
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        {cta && (
          <div className="mt-[9rem]">
            <SanityCta {...cta} className={`${ctaTextColor} font-body font-medium text-[1.5rem] leading-[1.5625rem] tracking-[0]`} />
          </div>
        )}
      </div>
    </section>
  );
}
