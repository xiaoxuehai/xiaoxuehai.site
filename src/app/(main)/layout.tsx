import type { PropsWithChildren } from 'react';

import { Background } from './Background';
import { Header } from './Header';
export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className='flex min-h-screen flex-col'>
        <Header />
        <main className='flex-1'>{children}</main>
      </div>
      <Background className='fixed bottom-0 left-0 right-0' />
    </>
  );
}
