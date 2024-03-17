import NextLink from 'next/link';

import { Button } from '@/components/ui/button';
export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center pt-60'>
      <div className='text-5xl font-bold'>404</div>
      <div className='py-4 text-3xl font-bold'>未找到页面</div>

      <Button asChild>
        <NextLink href='/'>返回首页</NextLink>
      </Button>
    </div>
  );
}
