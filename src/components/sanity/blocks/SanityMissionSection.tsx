"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { heading as headingCls, subheading, caption } from "@/lib/typography";
import type { PAGE_QUERYResult } from "../../../../sanity.types";

type PageBlock = NonNullable<
  NonNullable<PAGE_QUERYResult>["pageBuilder"]
>[number];
type SanityMissionSectionProps = Extract<
  PageBlock,
  { _type: "missionSection" }
>;

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
      <div className="w-full relative px-section-x pt-[2.37rem] pb-[11.07rem] flex flex-col gap-[5.47rem]">
        {/* Heading */}
        {heading && (
          <h2 className={`${headingCls} m-0`}>
            {heading}
          </h2>
        )}

        {/* Principles Grid */}
        {principles && principles.length > 0 && (
          <div className="grid grid-cols-5 gap-[5.47rem] items-start">
            {principles.map((principle, index) => (
              <div
                key={principle._key || index}
                className="flex flex-col gap-[0.9rem] w-full items-start"
              >
                {/* Icon */}
                {principle.icon?.asset?._ref ? (
                  <div className="w-full h-[10.14rem] relative mb-[0.9rem] flex items-center justify-center">
                    <Image
                      src={urlFor(principle.icon).width(500).height(500).url()}
                      alt=""
                      width={500}
                      height={500}
                      className="object-contain w-full h-full max-w-full max-h-full"
                    />
                  </div>
                ) : (
                  <div className="w-[10.14rem] h-[10.14rem] rounded-full mb-[0.9rem] bg-[radial-gradient(circle,rgba(0,100,200,1)_0%,rgba(0,150,255,0.8)_100%)]" />
                )}

                {/* Title */}
                {principle.title && (
                  <h3 className={`${subheading} m-0`}>
                    {principle.title}
                  </h3>
                )}

                {/* Description */}
                {principle.description && (
                  <p className={`${caption} m-0`}>
                    {principle.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Image Section */}
        {image?.asset?._ref && (
          <div className="w-full h-[10.14rem] relative">
            <Image
              src={urlFor(image).width(1304).url()}
              alt=""
              fill
              className="object-cover max-w-none"
            />
          </div>
        )}
      </div>
    </section>
  );
}
