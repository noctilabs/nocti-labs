'use client';

const imgEllipse1 = "https://www.figma.com/api/mcp/asset/df5226ae-9f00-4bde-a5ff-a78e0c12d502";

export default function About() {
  return (
    <section className="bg-black text-white py-20 px-10 md:px-16 min-h-auto">
      {/* Title */}
      <h2 className="font-body text-[48px] font-medium leading-[50px] mb-24 w-full max-w-2xl">
        What we stand for
      </h2>

      {/* Values Grid */}
      <div className="flex gap-20 items-start overflow-x-auto pb-12">
        {/* Value Card 1 */}
        <div className="flex flex-col gap-3 min-w-[210px]">
          <div className="w-36 h-36 rounded-full flex-shrink-0">
            <img alt="" className="block w-full h-full object-cover" src={imgEllipse1} />
          </div>
          <h3 className="font-body text-[24px] font-medium leading-[25px]">
            Systems over shortcuts
          </h3>
          <p className="font-body text-[14px] font-normal leading-[16px] text-white">
            We build durable commerce architectures, not quick fixes. Scalability and clarity come first.
          </p>
        </div>

        {/* Value Card 2 */}
        <div className="flex flex-col gap-3 min-w-[210px]">
          <div className="w-36 h-36 rounded-full flex-shrink-0">
            <img alt="" className="block w-full h-full object-cover" src={imgEllipse1} />
          </div>
          <h3 className="font-body text-[24px] font-medium leading-[25px]">
            Design and engineering as one
          </h3>
          <p className="font-body text-[14px] font-normal leading-[16px] text-white">
            Design informs technology. Technology enables design. Neither exists in isolation.
          </p>
        </div>

        {/* Value Card 3 */}
        <div className="flex flex-col gap-3 min-w-[210px]">
          <div className="w-36 h-36 rounded-full flex-shrink-0">
            <img alt="" className="block w-full h-full object-cover" src={imgEllipse1} />
          </div>
          <h3 className="font-body text-[24px] font-medium leading-[25px]">
            Composable by default
          </h3>
          <p className="font-body text-[14px] font-normal leading-[16px] text-white">
            Flexibility is not optional. We favor modular, future-proof systems that evolve with the business.
          </p>
        </div>

        {/* Value Card 4 */}
        <div className="flex flex-col gap-3 min-w-[210px]">
          <div className="w-36 h-36 rounded-full flex-shrink-0">
            <img alt="" className="block w-full h-full object-cover" src={imgEllipse1} />
          </div>
          <h3 className="font-body text-[24px] font-medium leading-[25px]">
            Ownership and transparency
          </h3>
          <p className="font-body text-[14px] font-normal leading-[16px] text-white">
            Clients own their stack. No lock-in. No black boxes. No unnecessary dependencies.
          </p>
        </div>

        {/* Value Card 5 */}
        <div className="flex flex-col gap-3 min-w-[210px]">
          <div className="w-36 h-36 rounded-full flex-shrink-0">
            <img alt="" className="block w-full h-full object-cover" src={imgEllipse1} />
          </div>
          <h3 className="font-body text-[24px] font-medium leading-[25px]">
            Long-term thinking
          </h3>
          <p className="font-body text-[14px] font-normal leading-[16px] text-white">
            We optimize for years, not launch day.
          </p>
        </div>
      </div>
    </section>
  );
}
