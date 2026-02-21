'use client';

import Link from 'next/link';

const services = [
  'Commerce Engineering',
  'AI & Automation',
  'UX & Experience Design',
  'Optimization & Growth',
];

export default function ServicesPreview() {
  return (
    <section className="bg-white text-black py-20 px-8 md:px-16" data-nav-theme="light">
      {/* Label */}
      <h2 className="font-body text-[40px] font-bold mb-16">Services</h2>

      {/* Service Rows */}
      <div className="space-y-px">
        {services.map((service, idx) => (
          <div key={idx}>
            <div className="py-8 text-[48px] md:text-[53px] font-body font-bold hover:opacity-70 transition cursor-pointer">
              {service}
            </div>
            {idx < services.length - 1 && <div className="h-px bg-black opacity-20"></div>}
          </div>
        ))}
      </div>

      {/* Bottom Link */}
      <div className="mt-16 pt-8 border-t border-black border-opacity-20">
        <Link href="/services" className="font-body text-[23px] text-black hover:opacity-70 transition">
          More about services →
        </Link>
      </div>
    </section>
  );
}
