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
          paddingLeft: "clamp(20px, 3vw, 40px)",
          paddingRight: "clamp(20px, 3vw, 40px)",
          paddingTop: "clamp(40px, 5vw, 80px)",
          paddingBottom: "clamp(40px, 5vw, 80px)",
        }}
      >
        {/* Heading */}
        {heading && (
          <h2
            style={{
              fontSize: "clamp(32px, 3.3vw, 48px)",
              fontFamily: 'var(--font-body), system-ui, sans-serif',
              fontWeight: "500",
              lineHeight: "50px",
              marginBottom: "clamp(40px, 5.4vw, 78px)",
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
                      fontSize: "clamp(32px, 3.3vw, 48px)",
                      fontFamily:
                        'var(--font-body), system-ui, sans-serif',
                      fontWeight: "500",
                      lineHeight: "50px",
                      paddingTop: "clamp(12px, 1.1vw, 16px)",
                      paddingBottom: "clamp(12px, 1.1vw, 16px)",
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
                        marginRight: "clamp(60px, 7.8vw, 113px)",
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
                        gap: "clamp(40px, 9.6vw, 139px)",
                        paddingTop: "clamp(20px, 2.6vw, 38px)",
                        paddingBottom: "clamp(20px, 3vw, 40px)",
                        borderBottom: "1px solid white",
                        animation: "slideDown 0.3s ease",
                      }}
                    >
                      {/* Left Column: Description */}
                      <div
                        style={{
                          fontSize: "clamp(16px, 1.66vw, 24px)",
                          fontFamily:
                            'var(--font-body), system-ui, sans-serif',
                          fontWeight: "400",
                          lineHeight: "29px",
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
                          gap: "clamp(20px, 2vw, 29px)",
                          paddingRight: "clamp(60px, 7.8vw, 113px)",
                        }}
                      >
                        {service.items &&
                          service.items.map((item) => (
                            <div key={item._key}>
                              <SanityCta
                                {...item}
                                className="text-white text-[clamp(16px,1.66vw,24px)] font-normal w-full flex justify-between"
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
              marginTop: "clamp(80px, 8.4vw, 122px)",
              fontWeight: 500,
            }}
          >
            <SanityCta {...cta} className="text-white" />
          </div>
        )}
      </div>
    </section>
  );
}
