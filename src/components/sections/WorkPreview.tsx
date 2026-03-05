'use client';

import React from 'react';

export default function WorkPreview(): React.ReactElement {
  return (
    <section className="bg-black text-white flex flex-col relative pb-0" data-nav-theme="dark">
      {/* Full Screen Green Placeholder Section */}
      <div className="w-full flex items-start justify-center relative px-[3rem] pt-[calc(2.5rem+4rem+30px)] pb-0">
        <div className="bg-[#00FF17] relative w-full aspect-[1200/667] px-[3rem] rounded-[3px] flex items-center justify-center">
          <div className="w-full max-w-[614px] flex flex-col gap-8">
            <div className="text-center">
              <p className="font-mono uppercase font-bold text-[#FF0000] italic text-[4rem] leading-[6rem] break-words">
                PROJECTS FULL SCREEN
              </p>
              <p className="font-mono uppercase font-bold text-[#FF0000] italic text-[4rem] leading-[6rem] break-words">
                ANIMATION / VIDEO
              </p>
            </div>
          </div>

          {/* Project Caption - overlapping the green box */}
          <div className="absolute bg-white rounded-[3px] bottom-[4rem] left-1/2 -translate-x-1/2 z-10 h-[6rem] max-w-[60rem] w-[40rem] p-[3rem] flex items-center justify-center">
            <p className="font-mono uppercase text-black opacity-80 text-center font-semibold text-[2rem] leading-[1.4]">
              Centro, Vintage Fashion Marketplace for the Gen Z
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
