import type { ComponentProps, ReactElement } from 'react';

import { useCallback, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

export function CopyIcon(props: ComponentProps<'svg'>): ReactElement {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      stroke='currentColor'
      {...props}
    >
      <rect
        x='9'
        y='9'
        width='13'
        height='13'
        rx='2'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
export function CheckIcon(props: ComponentProps<'svg'>): ReactElement {
  return (
    <svg
      viewBox='0 0 20 20'
      width='1em'
      height='1em'
      fill='currentColor'
      {...props}
    >
      <path
        fillRule='evenodd'
        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
        clipRule='evenodd'
      />
    </svg>
  );
}
export const CopyToClipboard = ({
  getValue,
  className,
  ...rest
}: {
  getValue: () => string;
} & ComponentProps<'button'>): ReactElement => {
  const [isCopied, setCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timerId = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [isCopied]);

  const handleClick = useCallback<
    NonNullable<ComponentProps<'button'>['onClick']>
  >(async () => {
    setCopied(true);
    if (!navigator?.clipboard) {
      console.error('拒绝访问剪贴板');
    }
    try {
      await navigator.clipboard.writeText(getValue());
    } catch {
      console.error('复制失败');
    }
  }, [getValue]);

  const Icon = isCopied ? CheckIcon : CopyIcon;

  return (
    <button
      onClick={handleClick}
      title='复制代码'
      tabIndex={0}
      {...rest}
      className={cn(
        'bg-opacity-[.85] backdrop-blur-md transition-all active:opacity-50 dark:bg-opacity-80',
        'bg-primary-700/5 rounded-md border border-black/5 p-1.5 text-gray-600 hover:text-gray-900',
        'dark:bg-primary-300/10 dark:border-white/10 dark:text-gray-400 dark:hover:text-gray-50',
        className,
      )}
    >
      <Icon className='pointer-events-none h-4 w-4 animate-in' />
    </button>
  );
};
