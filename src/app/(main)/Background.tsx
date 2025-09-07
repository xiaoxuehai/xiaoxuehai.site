import type { ComponentPropsWithoutRef } from 'react';

import React from 'react';

import { cn } from '@/lib/utils';

export function Background({
  className,
  ...rest
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden [--lights-bottom-height:420px] [--lights-side-height:900px]',
        className,
      )}
      {...rest}
    >
      <span
        className='pointer-events-none absolute left-[-12.5%] z-20 h-[var(--lights-side-height)] w-1/4 rotate-[-15deg] rounded-b-[25%] rounded-t-[100%] opacity-20 blur-[125px]'
        style={{
          background: 'linear-gradient(180deg, #77b8ff, rgb(42 138 246 / 40%))',
          top: 'calc(50% - var(--lights-side-height) / 2 + 151px)',
          willChange: 'filter',
        }}
      ></span>
      <span
        className='pointer-events-none absolute left-0 z-20 h-[var(--lights-bottom-height)] w-2/5 opacity-20 blur-[125px]'
        style={{
          background:
            'linear-gradient(180deg, rgb(29 92 162 / 20%), rgb(42 138 246 / 40%))',
          top: 'calc(50% - var(--lights-bottom-height) / 2 + 298px)',
        }}
      ></span>
      <span
        className='pointer-events-none absolute right-[-12.5%] z-20 h-[var(--lights-side-height)] w-1/4 rotate-[-15deg] rounded-b-[25%] rounded-t-[100%] bg-[] opacity-20 blur-[125px]'
        style={{
          background:
            'linear-gradient(180deg, rgb(236 151 207 / 40%), #e92a67)',
          top: 'calc(50% - var(--lights-side-height) / 2 + 151px)',
        }}
      ></span>
      <span
        className='pointer-events-none absolute right-0 z-20 h-[var(--lights-bottom-height)] w-2/5 opacity-20 blur-[125px]'
        style={{
          background:
            'linear-gradient(180deg, rgb(236 151 207 / 40%), #e92a67)',
          top: 'calc(50% - var(--lights-bottom-height) / 2 + 298px)',
        }}
      ></span>

      <span className='absolute bottom-0 left-0 z-30 h-48 w-full bg-gradient-to-t from-white to-transparent dark:from-black'></span>
    </div>
  );
}
