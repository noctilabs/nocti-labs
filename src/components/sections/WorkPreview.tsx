'use client';

import React from 'react';

export default function WorkPreview(): React.ReactElement {
  return (
    <section className="bg-black text-white flex flex-col relative" data-nav-theme="dark" style={{ paddingBottom: '0' }}>
      {/* Full Screen Green Placeholder Section */}
      <div className="w-full flex items-start justify-center relative" style={{ paddingLeft: '3rem', paddingRight: '3rem', paddingTop: 'calc(2.5rem + 4rem + 30px)', paddingBottom: '0' }}>
        <div
          className="bg-[#00FF17] relative w-full"
          style={{
            aspectRatio: '1200/667',
            paddingLeft: '3rem',
            paddingRight: '3rem',
            borderRadius: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '614px',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            <div className="text-center">
              <p
                className="font-mono uppercase font-bold text-[#FF0000] italic"
                style={{
                  fontSize: '4rem',
                  lineHeight: '6rem',
                  wordBreak: 'break-word',
                }}
              >
                PROJECTS FULL SCREEN
              </p>
              <p
                className="font-mono uppercase font-bold text-[#FF0000] italic"
                style={{
                  fontSize: '4rem',
                  lineHeight: '6rem',
                  wordBreak: 'break-word',
                }}
              >
                ANIMATION / VIDEO
              </p>
            </div>
          </div>

          {/* Project Caption - overlapping the green box */}
          <div
            className="absolute bg-white rounded-[3px]"
            style={{
              bottom: '4rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              height: '6rem',
              maxWidth: '60rem',
              width: '40rem',
              paddingTop: '3rem',
              paddingBottom: '3rem',
              paddingLeft: '3rem',
              paddingRight: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p
              className="font-mono uppercase text-black opacity-80 text-center font-semibold"
              style={{
                fontSize: '2rem',
                lineHeight: '1.4',
              }}
            >
              Centro, Vintage Fashion Marketplace for the Gen Z
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
