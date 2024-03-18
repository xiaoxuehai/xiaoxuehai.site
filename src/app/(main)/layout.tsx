import type { PropsWithChildren } from 'react';

import { Header } from './Header';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex-1'>{children}</main>
    </div>
  );
}
