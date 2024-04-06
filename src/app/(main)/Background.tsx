import React, { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

import $styles from './background.module.css';

export function Background({
  className,
  ...rest
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden',
        className,
      )}
      {...rest}
    >
      <div
        className='[--gradient-color-1=rgba(0,0,0,1)] [--gradient-color-2=rgba(0,0,0,0.8)] [--gradient-color-3=rgba(0,0,0,0)] dark:[--gradient-color-1=rgba(255,255,255,1)] dark:[--gradient-color-2=rgba(255,255,255,0.8)] dark:[--gradient-color-3=rgba(255,255,255,0)] absolute z-[-1] h-full w-full [--gradient-stop-1:60%] [--gradient-stop-2:85%] lg:[--gradient-stop-1:50%] lg:[--gradient-stop-2:90%]'
        style={{
          background:
            'linear-gradient(180deg, var(--gradient-color-1) 0%, var(--gradient-color-2) var(--gradient-stop-1), var(--gradient-color-3) var(--gradient-stop-2), 100% transparent)',
        }}
      ></div>
      <span
        className={cn('opacity-50 dark:opacity-100', $styles.left_lights)}
      ></span>
      <span
        className={cn('opacity-50 dark:opacity-100', $styles.right_lights)}
      ></span>
      <span
        className='absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-white to-transparent dark:from-black'
        style={{
          zIndex: 30,
        }}
      ></span>
    </div>
  );
}
