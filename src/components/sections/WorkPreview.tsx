'use client';

export default function WorkPreview() {
  return (
    <section className="bg-black text-white py-20 px-8 md:px-16 min-h-screen flex flex-col justify-center">
      {/* Label */}
      <h2 className="font-body text-[48px] font-bold mb-12">Work</h2>

      {/* Project Media Placeholder */}
      <div className="w-full aspect-video bg-accent rounded-lg mb-8 flex items-center justify-center">
        <div className="text-black text-center">
          <p className="font-mono text-[12px] uppercase font-bold">Project Media</p>
          <p className="font-mono text-[12px] uppercase mt-2 opacity-70">Full Screen Animation / Video</p>
        </div>
      </div>

      {/* Project Caption */}
      <p className="font-mono text-[14px] uppercase text-white opacity-80">
        Centro, Vintage Fashion Marketplace for the Gen Z
      </p>
    </section>
  );
}
