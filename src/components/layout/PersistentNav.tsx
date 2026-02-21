import React from 'react';
import NavLogo from '../ui/NavLogo';
import NavLinks from '../ui/NavLinks';
import NavContactButton from '../ui/NavContactButton';

/**
 * Persistent navigation component used across all pages (Hero, Work, Services, About, and Blog).
 * Ensures consistent positioning and styling across the application.
 */
export default function PersistentNav(): React.ReactElement {
  return (
    <nav
      style={{
        position: 'absolute',
        top: '35px',
        left: 'clamp(20px, 3vw, 40px)',
        right: 'clamp(20px, 3vw, 40px)',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: 'clamp(10px, 1.5vw, 22.2px)',
        paddingTop: '0px',
        paddingBottom: '0px',
        zIndex: 50,
      }}
    >
      <NavLogo className="justify-self-start" />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <NavLinks />
      </div>
      <NavContactButton className="justify-self-end" />
    </nav>
  );
}
