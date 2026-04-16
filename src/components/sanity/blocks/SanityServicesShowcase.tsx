"use client";

import { useState, useEffect, useRef, startTransition } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
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
      width={29}
      height={29}
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
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const expandedRef = useRef<HTMLDivElement | null>(null);
  const didScrollRef = useRef(false);

  useEffect(() => {
    if (isHome) return;
    const hash = window.location.hash.slice(1);
    if (hash) startTransition(() => setExpandedId(hash));
  }, [isHome]);

  useEffect(() => {
    if (!expandedId || !expandedRef.current || didScrollRef.current) return;
    didScrollRef.current = true;
    expandedRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    // After smooth scroll settles, fire a custom event so PersistentNav hides itself
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('nav-hide'));
    }, 700);
    return () => clearTimeout(timer);
  }, [expandedId]);

  const toggleService = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

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
                  <Link
                    href={`/services#${service._id}`}
                    className="font-body font-medium text-[3.2rem] leading-[3.7rem] py-[2.25rem] block hover:opacity-70 transition-opacity"
                  >
                    {service.title}
                  </Link>
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
        {cta && isHome && (
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
              const isExpanded = expandedId === service._id;
              const rowClass = `font-body font-medium text-[3rem] leading-[3.125rem] py-[1.5625rem] flex items-center border-b-[4px] ${borderColor} ${isFirst ? 'border-t-[4px]' : ''}`;

              if (isHome) {
                return (
                  <div key={service._id}>
                    <Link
                      href={`/services#${service._id}`}
                      className={`${rowClass} hover:opacity-70 transition-opacity duration-300`}
                    >
                      <span className="w-[38rem] shrink-0">{service.title}</span>
                      <ArrowIcon invert={!hasLightTheme} />
                    </Link>
                  </div>
                );
              }

              const expandedRowClass = isExpanded ? rowClass.replace('border-b-[4px]', '') : rowClass;
              return (
                <div key={service._id} ref={isExpanded ? expandedRef : null}>
                  <button
                    onClick={() => toggleService(service._id)}
                    className={`w-full text-left ${expandedRowClass} cursor-pointer select-none hover:opacity-70 transition-opacity duration-300 ${isExpanded ? '!items-start' : ''}`}
                  >
                    <span className={`w-[38rem] shrink-0${isExpanded ? ' pt-[1.5625rem]' : ''}`}>{service.title}</span>
                    <ArrowIcon
                      invert={!hasLightTheme}
                      className={`shrink-0 transition-transform duration-300 ease-in-out${isExpanded ? ' rotate-45 mt-[1.5625rem]' : ''}`}
                    />
                    {isExpanded && service.description && (
                      <p className="font-body font-normal text-[2rem] leading-[2.3125rem] tracking-[0] ml-[2.5rem] pt-[1.5625rem] pb-[1.5625rem]">
                        {service.description}
                      </p>
                    )}
                  </button>
                  {isExpanded && (
                    <div className={`border-b-[4px] ${borderColor} animate-[slideDown_0.3s_ease]`}>
                      {/* Sub-service items — horizontal marquee ticker */}

                      {service.items && service.items.length > 0 && (
                        <div className="overflow-hidden py-[1.25rem]">
                          <div className="flex animate-marquee whitespace-nowrap w-max">
                            {[...service.items, ...service.items].map((item, i) => (
                              <span
                                key={i}
                                className="font-body font-medium text-[2rem] leading-[2.3125rem] pr-[3rem]"
                              >
                                {item.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        {cta && isHome && (
          <div className="mt-[9rem]">
            <SanityCta {...cta} className={`${ctaTextColor} font-body font-medium text-[1.5rem] leading-[1.5625rem] tracking-[0]`} />
          </div>
        )}
      </div>
    </section>
  );
}
