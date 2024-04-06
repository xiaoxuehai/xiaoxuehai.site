import type { ComponentProps, ReactElement } from 'react';
import { useRef } from 'react';

import { cn } from '@/lib/utils';

import { CopyToClipboard } from './CopyToClipboard';
export const Pre = ({
  children,
  className,
  lang,
  filename,
  ...rest
}: ComponentProps<'pre'> & {
  filename?: string;
}): ReactElement => {
  const preRef = useRef<HTMLPreElement | null>(null);

  return (
    <div className='not-prose group relative mt-6 first:mt-0'>
      <div className='bg-primary-700/5 dark:bg-primary-300/10 absolute top-0 z-[1] flex w-full items-center justify-between truncate rounded-t-xl px-4 py-2 text-base text-gray-700 dark:text-gray-200'>
        <span>{filename}</span>
        <span className='group/copy:focus:opacity-0 transition group-hover:opacity-0'>
          {lang}
        </span>
      </div>

      <pre
        className={cn(
          'overflow-x-auto rounded-xl !bg-gray-100/50 subpixel-antialiased',
          'contrast-more:border-primary-900/20 contrast-more:dark:border-primary-100/40 p-5 pt-10 contrast-more:border contrast-more:contrast-150',
          className,
        )}
        ref={preRef}
        {...rest}
      >
        {children}
      </pre>
      <div className='copy absolute right-0 top-0 z-10 m-3 flex gap-1 opacity-0 transition focus-within:opacity-100 group-hover:opacity-100'>
        <CopyToClipboard
          className='group/copy'
          getValue={() =>
            preRef.current?.querySelector('code')?.textContent || ''
          }
        />
      </div>
    </div>
  );
};
