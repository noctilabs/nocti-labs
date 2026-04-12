"use client";

import { useState, useEffect, useRef, startTransition } from "react";
import SanityCta from "@/components/sanity/shared/SanityCta";
import { bodyMedium } from "@/lib/typography";
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

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      width="15"
      height="9"
      viewBox="0 0 15.36 10.32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <line
        x2="11.68"
        transform="matrix(0.657 0.754 -0.657 0.754 0 1.51)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x2="11.68"
        transform="matrix(0.657 -0.754 0.657 0.754 7.68 10.32)"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
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
  }, [expandedId]);

  const toggleService = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const sectionBg = isHome ? "bg-white text-black" : "bg-black text-white";
  const borderColor = isHome ? "border-black" : "border-white";
  const ctaTextColor = isHome ? "text-black" : "text-white";

  return (
    <section
      data-nav-theme={isHome ? "light" : "dark"}
      className={`${sectionBg} flex flex-col relative min-h-screen`}
      suppressHydrationWarning
    >
      {/* ── MOBILE LAYOUT ── */}
      <div className="md:hidden px-[1.4rem] pt-[4.5rem] pb-[3.4rem] flex flex-col">
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
      <div className="hidden md:block w-full relative px-section-x pt-[2.375rem] pb-[2rem]">
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
              const rowClass = `font-body font-medium text-[3rem] leading-[3.125rem] py-[1.5625rem] flex justify-between items-center border-b-[4px] ${borderColor} ${isFirst ? 'border-t-[4px]' : ''}`;

              if (isHome) {
                return (
                  <div key={service._id}>
                    <a
                      href={`/services#${service._id}`}
                      className={`${rowClass} hover:opacity-70 transition-opacity duration-300`}
                    >
                      <span>{service.title}</span>
                    </a>
                  </div>
                );
              }

              const isExpanded = expandedId === service._id;
              const expandedRowClass = isExpanded ? rowClass.replace('border-b-[4px]', '') : rowClass;
              return (
                <div key={service._id} ref={isExpanded ? expandedRef : null}>
                  <div
                    onClick={() => toggleService(service._id)}
                    className={`${expandedRowClass} cursor-pointer transition-opacity duration-300 ease-in-out select-none hover:opacity-70`}
                  >
                    <span>{service.title}</span>
                    <span className={`mr-[7.8rem] transition-transform duration-300 ease-in-out flex items-center ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                      <ChevronIcon />
                    </span>
                  </div>
                  {isExpanded && (
                    <div className={`pb-[3rem] border-b-[4px] ${borderColor} animate-[slideDown_0.3s_ease]`}>
                      <div className="grid grid-cols-[41fr_59fr] gap-[9.6rem]">
                        <div className="font-body font-normal text-[1.5rem] leading-[1.208] tracking-[0] pt-[2.6rem]">{service.description}</div>
                        <div className={`${bodyMedium} flex flex-col pt-[2.6rem]`}>
                          {service.items && service.items.map((item, i) => (
                            <div key={item._key} className={`border-b-2 ${borderColor} pb-[0.35rem] ${i === 0 ? 'pt-0' : 'pt-[1.2rem]'}`}>
                              <span className="pl-[1rem] font-body font-normal text-[1.5rem] leading-[1.208] tracking-[0]">{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
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
