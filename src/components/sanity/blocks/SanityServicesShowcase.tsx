"use client";

import { useState } from "react";
import SanityCta from "@/components/sanity/shared/SanityCta";
import type { PAGE_QUERYResult } from "../../../../sanity.types";

type PageBlock = NonNullable<
  NonNullable<PAGE_QUERYResult>["pageBuilder"]
>[number];
type SanityServicesShowcaseProps = Extract<
  PageBlock,
  { _type: "servicesShowcase" }
>;

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
  services,
  cta,
}: SanityServicesShowcaseProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      data-nav-theme="dark"
      className="bg-black text-white flex flex-col relative"
      suppressHydrationWarning
    >
      <div className="w-full relative px-[3rem] py-[5rem]">
        {/* Heading */}
        {heading && (
          <h2 className="text-[3.32rem] font-body font-medium not-italic leading-[1.042] tracking-[0] mb-[5.4rem]">
            {heading}
          </h2>
        )}

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
                    className={`text-[3.32rem] font-body font-medium leading-[1.042] tracking-[0] py-[1.1rem] cursor-pointer flex justify-between items-center transition-opacity duration-300 ease-in-out select-none border-b border-white hover:opacity-70 ${isFirst ? 'border-t' : ''}`}
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
                      <div className="text-[1.66rem] font-body font-normal not-italic leading-[1.208] tracking-[0] text-white">
                        {service.description}
                      </div>

                      {/* Right Column: Service Items */}
                      <div className="flex flex-col gap-8 pr-[7.8rem] text-[1.66rem] font-body font-normal leading-[1.208] tracking-[0]">
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
          <div className="mt-[8.4rem] font-medium leading-[1.042]">
            <SanityCta {...cta} className="text-white" />
          </div>
        )}
      </div>
    </section>
  );
}
