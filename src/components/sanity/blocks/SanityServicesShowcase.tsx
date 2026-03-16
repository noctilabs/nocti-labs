"use client";

import { useState } from "react";
import { stegaClean } from "next-sanity";
import { createDataAttribute } from "@sanity/visual-editing";
import SanityCta from "@/components/sanity/shared/SanityCta";
import { bodyMedium } from "@/lib/typography";
import type { PAGE_QUERYResult } from "../../../../sanity.types";

type PageBlock = NonNullable<
  NonNullable<PAGE_QUERYResult>["pageBuilder"]
>[number];
type SanityServicesShowcaseProps = Extract<
  PageBlock,
  { _type: "servicesShowcase" }
> & {
  tagline?: string;
  documentId?: string;
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
  _key,
  documentId,
}: SanityServicesShowcaseProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const cleanTagline = stegaClean(tagline) ?? ''

  const attr = (path: string) =>
    documentId
      ? { 'data-sanity': createDataAttribute({ id: documentId, type: 'page', path: `pageBuilder[_key=="${_key}"].${path}` }).toString() }
      : {};

  const toggleService = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      data-nav-theme="dark"
      className="bg-black text-white flex flex-col relative"
      suppressHydrationWarning
    >
      <div className="w-full relative px-section-x pt-[2.375rem] pb-[2rem]">
        {/* Heading and Tagline */}
        <div className="flex items-start mb-[2rem]">
          {heading && (
            <h2 className="font-body font-medium text-[3rem] leading-[3.125rem] w-[54.8%] shrink-0" {...attr('heading')}>
              {heading}
            </h2>
          )}
          {tagline && (
            <div className="font-body text-[2rem] leading-[2.3125rem] not-italic text-white font-[500] flex-1" {...attr('tagline')}>
              <p className="mb-0" suppressHydrationWarning>{cleanTagline.split('\n')[0]}</p>
              <p suppressHydrationWarning>{cleanTagline.split('\n')[1]}</p>
            </div>
          )}
        </div>

        {/* Services Accordion */}
        {services && services.length > 0 && (
          <div className="flex flex-col">
            {services.map((service, index) => {
              const isExpanded = expandedId === service._id;
              const isFirst = index === 0;

              return (
                <div key={service._id}>
                  {/* Accordion Header */}
                  <div
                    onClick={() => toggleService(service._id)}
                    className={`font-body font-medium text-[3rem] leading-[3.125rem] py-[1.1rem] cursor-pointer flex justify-between items-center transition-opacity duration-300 ease-in-out select-none border-b border-white hover:opacity-70 ${isFirst ? 'border-t' : ''}`}
                  >
                    <span>{service.title}</span>
                    <span
                      className={`mr-[7.8rem] transition-transform duration-300 ease-in-out flex items-center ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
                    >
                      <ChevronIcon />
                    </span>
                  </div>

                  {/* Expanded Content: Two Column Layout */}
                  {isExpanded && (
                    <div className="grid grid-cols-[41fr_59fr] gap-[9.6rem] pt-[2.6rem] pb-[3rem] border-b border-white animate-[slideDown_0.3s_ease]">
                      {/* Left Column: Description */}
                      <div className={bodyMedium}>
                        {service.description}
                      </div>

                      {/* Right Column: Service Items */}
                      <div className={`${bodyMedium} flex flex-col gap-8 pr-[7.8rem]`}>
                        {service.items &&
                          service.items.map((item) => (
                            <div key={item._key}>
                              <SanityCta
                                {...item}
                                className="text-white w-full flex justify-between"
                              />
                            </div>
                          ))}
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
          <div className="mt-[3.75rem]">
            <SanityCta {...cta} className="text-white font-body font-medium text-[1.5rem] leading-[1.5625rem] tracking-[0]" />
          </div>
        )}
      </div>
    </section>
  );
}
