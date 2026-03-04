"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { PAGE_QUERYResult } from "../../../../sanity.types";

type PageBlock = NonNullable<
  NonNullable<PAGE_QUERYResult>["pageBuilder"]
>[number];
type SanityMissionSectionProps = Extract<
  PageBlock,
  { _type: "missionSection" }
>;

/**
 * SanityMissionSection component displays a "Mission" section with a heading,
 * optional decorative image, and a grid of principles/values.
 */
export default function SanityMissionSection({
  heading,
  image,
  principles,
}: SanityMissionSectionProps) {
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
          paddingBottom: "160px",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(80px, 2.5vw, 80px)",
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
              marginTop: "0px",
            }}
          >
            {heading}
          </h2>
        )}

        {/* Principles Grid */}
        {principles && principles.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(clamp(120px, 20vw, 210px), 1fr))",
              gap: "clamp(20px, 4vw, 79px)",
            }}
          >
            {principles.map((principle, index) => (
              <div
                key={principle._key || index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(13px, 1.5vw, 16px)",
                  width: "100%",
                }}
              >
                {/* Icon */}
                {principle.icon?.asset?._ref ? (
                  <div
                    style={{
                      width: "clamp(120px, 10vw, 160px)",
                      height: "clamp(120px, 10vw, 160px)",
                      borderRadius: "50%",
                      position: "relative",
                      marginBottom: "clamp(13px, 1vw, 13px)",
                      background:
                        "radial-gradient(circle, rgba(0, 100, 200, 1) 0%, rgba(0, 150, 255, 0.8) 100%)",
                    }}
                  >
                    <Image
                      src={urlFor(principle.icon).width(160).height(160).url()}
                      alt=""
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      width: "clamp(120px, 10vw, 160px)",
                      height: "clamp(120px, 10vw, 160px)",
                      borderRadius: "50%",
                      marginBottom: "clamp(13px, 1vw, 13px)",
                      background:
                        "radial-gradient(circle, rgba(0, 100, 200, 1) 0%, rgba(0, 150, 255, 0.8) 100%)",
                    }}
                  />
                )}

                {/* Title */}
                {principle.title && (
                  <h3
                    style={{
                      fontSize: "clamp(20px, 1.66vw, 24px)",
                      fontFamily: 'var(--font-body), system-ui, sans-serif',
                      fontWeight: "500",
                      lineHeight: "25px",
                      marginBottom: "clamp(13px, 1vw, 13px)",
                    }}
                  >
                    {principle.title}
                  </h3>
                )}

                {/* Description */}
                {principle.description && (
                  <p
                    style={{
                      fontSize: "clamp(14px, 0.97vw, 14px)",
                      fontFamily: 'var(--font-body), system-ui, sans-serif',
                      fontWeight: "400",
                      lineHeight: "16px",
                      color: "white",
                    }}
                  >
                    {principle.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Image Section */}
        {image?.asset?._ref && (
          <div
            style={{
              width: "100%",
              height: "clamp(146px, 11vw, 147px)",
              position: "relative",
            }}
          >
            <Image
              src={urlFor(image).width(1304).url()}
              alt=""
              fill
              className="object-cover"
              style={{ maxWidth: "none" }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
