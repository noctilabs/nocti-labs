'use client';

const values = [
  {
    title: 'Systems over shortcuts',
    description: 'We build sustainable solutions that scale, not quick fixes. Our approach prioritizes long-term architecture over temporary patches.',
  },
  {
    title: 'Design and engineering as one',
    description: 'Design and engineering work together from day one. We eliminate silos and create cohesive products that are both beautiful and functional.',
  },
  {
    title: 'Composable by default',
    description: 'Modularity is built into our DNA. We create systems that are flexible, reusable, and easy to extend as your business evolves.',
  },
  {
    title: 'Ownership and transparency',
    description: 'We own our work and communicate openly. You always know where your project stands and what we\'re building next.',
  },
  {
    title: 'Long-term thinking',
    description: 'We partner with clients for the long haul. Our success is measured by your sustained growth, not just project completion.',
  },
];

export default function Values() {
  return (
    <section className="bg-black text-white py-20 px-8 md:px-16">
      {/* Label */}
      <h2 className="font-body text-[48px] font-bold mb-16">What we stand for</h2>

      {/* Values Grid */}
      <div className="space-y-px">
        {values.map((value, idx) => (
          <div key={idx}>
            <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Decorator Circle */}
              <div className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2"></div>
              </div>

              {/* Title */}
              <div>
                <h3 className="font-body text-[24px] font-bold">
                  {value.title}
                </h3>
              </div>

              {/* Description */}
              <div>
                <p className="font-body text-[14px] text-white opacity-70">
                  {value.description}
                </p>
              </div>
            </div>
            {idx < values.length - 1 && <div className="h-px bg-white opacity-20"></div>}
          </div>
        ))}
      </div>
    </section>
  );
}
