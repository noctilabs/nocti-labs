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
        left: '40px',
        right: '40px',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: '17.76px',
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
