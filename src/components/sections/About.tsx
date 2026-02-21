'use client';

export default function About() {
  return (
    <section className="bg-black text-white py-20 px-8 md:px-16 min-h-screen flex flex-col justify-center">
      {/* Label */}
      <h2 className="font-body text-[48px] font-bold mb-16">About</h2>

      {/* Main Paragraph */}
      <p className="font-body text-[43px] font-bold leading-tight max-w-5xl">
        We specialize in engineered commerce solutions for the next generation of digital businesses. We design and develop modular, scalable ecosystems that integrate AI, automation, and advanced workflows across all channels.
      </p>
    </section>
  );
}
