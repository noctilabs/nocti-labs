'use client';

import React from 'react';

export default function WorkPreview(): React.ReactElement {
  return (
    <section className="bg-black text-white min-h-screen flex flex-col relative" style={{ paddingTop: '122.3px', paddingBottom: '122.3px' }}>
      {/* Full Screen Green Placeholder Section */}
      <div className="w-full flex-1 flex items-center justify-center relative" style={{ paddingLeft: '40px', paddingRight: '40px' }}>
        <div
          className="bg-[#00FF17] relative"
          style={{
            width: '1200px',
            height: '667px',
            paddingLeft: '40px',
            paddingRight: '40px',
            borderRadius: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div>
            <div className="text-center">
              <p className="font-mono text-[48px] md:text-[40px] uppercase font-bold text-[#FF0000] leading-[72px] italic">
                PROJECTS FULL SCREEN
              </p>
              <p className="font-mono text-[48px] md:text-[40px] uppercase font-bold text-[#FF0000] leading-[72px] italic">
                ANIMATION / VIDEO
              </p>
            </div>
          </div>
        </div>
        {/* Project Caption - Overlapping on top */}
        <div
          className="absolute bg-white"
          style={{
            bottom: '41px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            width: '605px',
            height: '60px',
            paddingTop: '32px',
            paddingBottom: '32px',
            paddingLeft: '32px',
            paddingRight: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p
            className="font-mono text-[14px] uppercase text-black opacity-80 text-center font-semibold"
            style={{
              width: '583px',
              height: '54px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Centro, Vintage Fashion Marketplace for the Gen Z
          </p>
        </div>
      </div>
    </section>
  );
}
