"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { subheading, caption } from "@/lib/typography";
import type { PAGE_QUERY_RESULT } from "../../../../sanity.types";

type PageBlock = NonNullable<
  NonNullable<PAGE_QUERY_RESULT>["pageBuilder"]
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
      <div className="w-full relative px-[2.38vw] md:px-section-x pt-[1rem] max-md:pb-[5rem] md:pb-[5rem] flex flex-col">
        {/* Heading — mobile: 11.43vw (48px at 420px frame), desktop: 3.32rem */}
        {heading && (
          <h2 className="text-[11.43vw] leading-[11.9vw] font-body font-medium m-0 md:text-[3.32rem] md:leading-[1.042]">
            {heading}
          </h2>
        )}

        {/* Principles */}
        {principles && principles.length > 0 && (
          <>
            {/* Desktop: 5-col grid */}
            <div className="hidden md:grid grid-cols-5 gap-[5.47rem] items-start mt-[5.47rem]">
              {principles.map((principle, index) => (
                <div
                  key={principle._key || index}
                  className="flex flex-col gap-[0.9rem] w-full items-start"
                >
                  {principle.icon?.asset?._ref ? (
                    <div className="w-full h-[13.41522rem] relative mb-[0.9rem] flex items-center justify-center">
                      <Image
                        src={urlFor(principle.icon).width(500).height(500).url()}
                        alt=""
                        width={500}
                        height={500}
                        className="object-contain w-full h-full max-w-full max-h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-[13.41522rem] h-[13.41522rem] rounded-full mb-[0.9rem] bg-[radial-gradient(circle,rgba(0,100,200,1)_0%,rgba(0,150,255,0.8)_100%)]" />
                  )}
                  {principle.title && (
                    <h3 className={`${subheading} m-0`}>{principle.title}</h3>
                  )}
                  {principle.description && (
                    <p className={`${caption} m-0`}>{principle.description}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile: alternating 2-col grid, matches Figma pixel layout */}
            {/* Each row: 2 equal columns. Odd rows: text | icon. Even rows: icon | text. */}
            <div className="flex flex-col mt-[13.57vw] gap-[21.9vw] md:hidden">
              {principles.map((principle, index) => {
                const isEvenRow = index % 2 === 1;

                // icon on left (isEvenRow): justify-start, pl-[5.71vw] (x=24/420)
                // icon on right (!isEvenRow): justify-end, pr-[2.38vw] (420-393=27px→x=266/420)
                const iconEl = (
                  <div className={`w-[45.71vw] flex items-start ${isEvenRow ? 'justify-start pl-[5.71vw]' : 'justify-end pr-[2.38vw]'}`}>
                    {principle.icon?.asset?._ref ? (
                      <Image
                        src={urlFor(principle.icon).width(500).height(500).url()}
                        alt=""
                        width={500}
                        height={500}
                        className="w-[30.24vw] h-auto object-contain flex-shrink-0"
                      />
                    ) : (
                      <div className="w-[30.24vw] h-[30.24vw] flex-shrink-0 rounded-full bg-[radial-gradient(circle,rgba(0,100,200,1)_0%,rgba(0,150,255,0.8)_100%)]" />
                    )}
                  </div>
                );

                const textEl = (
                  <div className="w-[54.29vw] flex flex-col gap-[3vw] md:gap-[0.5rem]">
                    {principle.title && (
                      <h3 className="text-[5.71vw] leading-[5.95vw] font-body font-medium m-0 md:text-[1.5rem] md:leading-[1.5625rem]">
                        {principle.title}
                      </h3>
                    )}
                    {principle.description && (
                      <p className="text-[3.33vw] leading-[3.81vw] font-body font-normal m-0 md:text-[0.875rem] md:leading-[1rem]">
                        {principle.description}
                      </p>
                    )}
                  </div>
                );

                return (
                  <div
                    key={principle._key || index}
                    className="flex flex-row items-center"
                  >
                    {isEvenRow ? (
                      <>
                        {iconEl}
                        {textEl}
                      </>
                    ) : (
                      <>
                        {textEl}
                        {iconEl}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Image Section */}
        {image?.asset?._ref && (
          <div className="w-full h-[10.14rem] relative mt-[5.47rem]">
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
