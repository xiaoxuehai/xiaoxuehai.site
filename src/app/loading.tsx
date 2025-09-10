import React from 'react';

export default function Loading() {
  return (
    <div className='flex items-center justify-center py-32 text-sm text-zinc-600 dark:text-zinc-200'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='mr-2 h-4 w-4 animate-spin'
      >
        <path d='M21 12a9 9 0 1 1-6.219-8.56' />
      </svg>
      加载中...
    </div>
  );
}
