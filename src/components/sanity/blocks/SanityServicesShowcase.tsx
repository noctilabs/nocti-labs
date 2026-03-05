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
      <div
        style={{
          width: "100%",
          position: "relative",
          paddingLeft: "3rem",
          paddingRight: "3rem",
          paddingTop: "5rem",
          paddingBottom: "5rem",
        }}
      >
        {/* Heading */}
        {heading && (
          <h2
            style={{
              fontSize: "3.32rem",
              fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 500,
              fontStyle: "normal",
              lineHeight: "1.042",
              letterSpacing: "0",
              marginBottom: "5.4rem",
            }}
          >
            {heading}
          </h2>
        )}

        {/* Services Accordion */}
        {services && services.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {services.map((service, index) => {
              const isExpanded = expandedId === service._id;
              const isFirst = index === 0;

              return (
                <div key={service._id}>
                  {/* Accordion Header */}
                  <div
                    onClick={() => toggleService(service._id)}
                    style={{
                      fontSize: "3.32rem",
                      fontFamily:
                        'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontWeight: 500,
                      lineHeight: "1.042",
                      letterSpacing: "0",
                      paddingTop: "1.1rem",
                      paddingBottom: "1.1rem",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "opacity 0.3s ease",
                      userSelect: "none",
                      borderTop: isFirst ? "1px solid white" : "none",
                      borderBottom: "1px solid white",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = "0.7")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    <span>{service.title}</span>
                    <span
                      style={{
                        marginRight: "7.8rem",
                        transition: "transform 0.3s ease",
                        transform: isExpanded
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ChevronIcon />
                    </span>
                  </div>

                  {/* Expanded Content: Two Column Layout */}
                  {isExpanded && (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "41fr 59fr",
                        gap: "9.6rem",
                        paddingTop: "2.6rem",
                        paddingBottom: "3rem",
                        borderBottom: "1px solid white",
                        animation: "slideDown 0.3s ease",
                      }}
                    >
                      {/* Left Column: Description */}
                      <div
                        style={{
                          fontSize: "1.66rem",
                          fontFamily:
                            'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
                          fontWeight: 400,
                          fontStyle: "normal",
                          lineHeight: "1.208",
                          letterSpacing: "0",
                          color: "white",
                        }}
                      >
                        {service.description}
                      </div>

                      {/* Right Column: Service Items */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "2rem",
                          paddingRight: "7.8rem",
                          fontSize: "1.66rem",
                          fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
                          fontWeight: 400,
                          lineHeight: "1.208",
                          letterSpacing: "0",
                        }}
                      >
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
          <div
            style={{
              marginTop: "8.4rem",
              fontWeight: 500,
              lineHeight: "1.042",
            }}
          >
            <SanityCta {...cta} className="text-white" />
          </div>
        )}
      </div>
    </section>
  );
}
