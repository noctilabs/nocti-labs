'use client';

import { usePathname } from 'next/navigation';
import PersistentNav from './PersistentNav';

export default function NavWrapper() {
  const pathname = usePathname();

  if (pathname.startsWith('/studio')) {
    return null;
  }

  return <PersistentNav />;
}
