import NextLink from 'next/link';

import { Button } from '@/components/ui/button';
export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center pt-60'>
      <div className='text-5xl font-bold text-gray-800 dark:text-gray-500'>
        404
      </div>
      <div className='mt-4 text-base text-gray-500 dark:text-gray-300'>
        抱歉，您访问的页面不存在
      </div>

      <Button asChild className='mt-8'>
        <NextLink href='/'>返回首页</NextLink>
      </Button>
    </div>
  );
}
