'use client';

import React from 'react';

export default function WorkPreview(): React.ReactElement {
  return (
    <section className="bg-black text-white flex flex-col relative" data-nav-theme="dark" style={{ paddingBottom: '0' }}>
      {/* Full Screen Green Placeholder Section */}
      <div className="w-full flex items-start justify-center relative" style={{ paddingLeft: 'clamp(20px, 3vw, 40px)', paddingRight: 'clamp(20px, 3vw, 40px)', paddingTop: 'calc(clamp(20px, 2.5vw, 35px) + clamp(36px, 4vw, 75px) + 30px)', paddingBottom: '0' }}>
        <div
          className="bg-[#00FF17] relative w-full"
          style={{
            aspectRatio: '1200/667',
            paddingLeft: 'clamp(20px, 3vw, 40px)',
            paddingRight: 'clamp(20px, 3vw, 40px)',
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
              gap: 'clamp(0px, 2vw, 20px)',
            }}
          >
            <div className="text-center">
              <p
                className="font-mono uppercase font-bold text-[#FF0000] italic"
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                  lineHeight: 'clamp(2.25rem, 6vw, 4.5rem)',
                  wordBreak: 'break-word',
                }}
              >
                PROJECTS FULL SCREEN
              </p>
              <p
                className="font-mono uppercase font-bold text-[#FF0000] italic"
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                  lineHeight: 'clamp(2.25rem, 6vw, 4.5rem)',
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
              bottom: 'clamp(20px, 4vw, 41px)',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              height: 'clamp(44px, 6vw, 60px)',
              maxWidth: 'clamp(250px, 60vw, 605px)',
              width: 'clamp(250px, 40vw, 605px)',
              paddingTop: 'clamp(16px, 3vw, 32px)',
              paddingBottom: 'clamp(16px, 3vw, 32px)',
              paddingLeft: 'clamp(16px, 3vw, 32px)',
              paddingRight: 'clamp(16px, 3vw, 32px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p
              className="font-mono uppercase text-black opacity-80 text-center font-semibold"
              style={{
                fontSize: 'clamp(11px, 2vw, 14px)',
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
