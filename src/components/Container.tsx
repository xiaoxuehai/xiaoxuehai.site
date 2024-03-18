import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import { clsxm } from '@/lib/clsxm';

export type ContainerProps = ComponentPropsWithoutRef<'div'>;

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container({ children, className, ...rest }: ContainerProps, ref) {
    return (
      <div
        ref={ref}
        className={clsxm('sm:px-18 relative mx-auto max-w-7xl px-4', className)}
        {...rest}
      >
        <div className='mx-auto max-w-2xl lg:max-w-5xl'>{children}</div>
      </div>
    );
  },
);
