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
          paddingLeft: "3rem",
          paddingRight: "3rem",
          paddingTop: "2.37rem",
          paddingBottom: "11.07rem",
          display: "flex",
          flexDirection: "column",
          gap: "5.47rem",
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
              gap: "5.47rem",
              alignItems: "start",
            }}
          >
            {principles.map((principle, index) => (
              <div
                key={principle._key || index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.9rem",
                  width: "100%",
                  alignItems: "flex-start",
                }}
              >
                {/* Icon */}
                {principle.icon?.asset?._ref ? (
                  <div
                    style={{
                      width: "100%",
                      height: "10.14rem",
                      position: "relative",
                      marginBottom: "0.9rem",
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
                      width: "10.14rem",
                      height: "10.14rem",
                      borderRadius: "50%",
                      marginBottom: "0.9rem",
                      background:
                        "radial-gradient(circle, rgba(0, 100, 200, 1) 0%, rgba(0, 150, 255, 0.8) 100%)",
                    }}
                  />
                )}

                {/* Title */}
                {principle.title && (
                  <h3
                    style={{
                      fontSize: "1.66rem",
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
                      fontSize: "0.97rem",
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
              height: "10.14rem",
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
