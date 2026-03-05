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
          paddingLeft: "clamp(20px, 2.77vw, 100vw)",
          paddingRight: "clamp(20px, 2.77vw, 100vw)",
          paddingTop: "clamp(10px, 2.37vw, 100vw)",
          paddingBottom: "clamp(80px, 11.07vw, 100vw)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(40px, 5.47vw, 100vw)",
        }}
      >
        {/* Heading */}
        {heading && (
          <h2
            style={{
              fontSize: "clamp(28px, 3.32vw, 100vw)",
              fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 500,
              fontStyle: "normal",
              lineHeight: "1.042",
              letterSpacing: "0",
              margin: 0,
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
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "clamp(20px, 5.47vw, 100vw)",
              alignItems: "start",
            }}
          >
            {principles.map((principle, index) => (
              <div
                key={principle._key || index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(8px, 0.9vw, 100vw)",
                  width: "100%",
                  alignItems: "flex-start",
                }}
              >
                {/* Icon */}
                {principle.icon?.asset?._ref ? (
                  <div
                    style={{
                      width: "100%",
                      height: "clamp(80px, 10.14vw, 100vw)",
                      position: "relative",
                      marginBottom: "clamp(8px, 0.9vw, 100vw)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={urlFor(principle.icon).width(500).height(500).url()}
                      alt=""
                      width={500}
                      height={500}
                      className="object-contain"
                      style={{ width: "100%", height: "100%", maxWidth: "100%", maxHeight: "100%" }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      width: "clamp(80px, 10.14vw, 100vw)",
                      height: "clamp(80px, 10.14vw, 100vw)",
                      borderRadius: "50%",
                      marginBottom: "clamp(8px, 0.9vw, 100vw)",
                      background:
                        "radial-gradient(circle, rgba(0, 100, 200, 1) 0%, rgba(0, 150, 255, 0.8) 100%)",
                    }}
                  />
                )}

                {/* Title */}
                {principle.title && (
                  <h3
                    style={{
                      fontSize: "clamp(16px, 1.66vw, 100vw)",
                      fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontWeight: 500,
                      fontStyle: "normal",
                      lineHeight: "1.042",
                      letterSpacing: "0",
                      margin: 0,
                      color: "white",
                    }}
                  >
                    {principle.title}
                  </h3>
                )}

                {/* Description */}
                {principle.description && (
                  <p
                    style={{
                      fontSize: "clamp(11px, 0.97vw, 100vw)",
                      fontFamily: 'var(--font-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
                      fontWeight: 400,
                      fontStyle: "normal",
                      lineHeight: "1.143",
                      letterSpacing: "0",
                      color: "white",
                      margin: 0,
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
              height: "clamp(80px, 10.14vw, 100vw)",
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
