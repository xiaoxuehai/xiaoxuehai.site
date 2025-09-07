'use client';

import type { MouseEvent, PropsWithChildren } from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { X } from 'lucide-react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { navigation } from '@/config/navigation';
import { cn } from '@/lib/utils';

function DesktopNavItem({
  href,
  children,
}: PropsWithChildren & { href: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <NextLink
        href={href}
        className={cn(
          'relative flex h-full items-center whitespace-nowrap px-3 py-2 transition duration-300',
          isActive
            ? 'text-teal-500 dark:text-teal-400'
            : 'hover:text-teal-500 dark:hover:text-teal-400',
        )}
      >
        {children}
        {isActive && (
          <motion.span
            className='absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-amber-700/0 via-teal-700/70 to-teal-700/0 dark:from-amber-500/0 dark:via-teal-500/40 dark:to-amber-500/0'
            layoutId='active-navigation-item'
          />
        )}
      </NextLink>
    </li>
  );
}
function MobileNavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <NextLink href={href} className='block py-3'>
        {children}
      </NextLink>
    </li>
  );
}

function Mobile() {
  return (
    <Dialog>
      <DialogTrigger className='group flex w-20 items-center justify-between rounded-full bg-gradient-to-b from-zinc-50/50 to-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:from-zinc-900/50 dark:to-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20'>
        前往
        <FaAngleDown />
      </DialogTrigger>
      <DialogOverlay className='bg-zinc-800/40 backdrop-blur dark:bg-black/80' />
      <DialogPrimitive.Content className='fixed left-1/2 top-48 z-50 grid w-11/12 max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 divide-zinc-500/20 rounded-3xl border bg-background p-8 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]'>
        <div className='flex justify-between'>
          <DialogTitle className='text-base leading-5 text-zinc-700 dark:text-zinc-300'>
            站内导航
          </DialogTitle>

          <DialogPrimitive.Close className='rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
            <X className='h-5 w-5' />
            <span className='sr-only'>Close</span>
          </DialogPrimitive.Close>
        </div>

        <nav className='mt-4'>
          <ul className='-my-2 divide-y divide-zinc-500/20 text-base dark:divide-zinc-100/5'>
            {navigation.map(({ href, text }) => (
              <MobileNavItem key={href} href={href}>
                <DialogClose className='w-full text-left'>{text}</DialogClose>
              </MobileNavItem>
            ))}
          </ul>
        </nav>
      </DialogPrimitive.Content>
    </Dialog>
  );
}
function Desktop() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = useMotionValue(0);
  const handleMouseMove = useCallback(
    ({ clientX, clientY, currentTarget }: MouseEvent) => {
      const { left, top, width, height } =
        currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
      radius.set(Math.sqrt(width ** 2 + height ** 2) / 3);
    },
    [mouseX, mouseY, radius],
  );
  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, var(--spotlight-color) 10%, transparent 75%)`;

  return (
    <nav
      onMouseMove={handleMouseMove}
      className={cn(
        'group relative',
        'rounded-full bg-gradient-to-b from-zinc-50/70 to-white/90',
        'shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md',
        'dark:from-zinc-900/70 dark:to-zinc-800/90 dark:ring-zinc-100/10',
        '[--spotlight-color:rgb(20,184,166,0.1)] dark:[--spotlight-color:rgb(20,184,166,0.3)]',
      )}
    >
      <motion.span
        className='pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100'
        style={{ background }}
      />

      <ul className='flex h-full px-3 text-sm font-medium text-zinc-800 dark:text-zinc-200'>
        {navigation.map(({ href, text }) => (
          <DesktopNavItem key={href} href={href}>
            {text}
          </DesktopNavItem>
        ))}
      </ul>
    </nav>
  );
}
export function NavigationBar() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    setIsDesktop(mediaQuery.matches);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return isDesktop ? <Desktop /> : <Mobile />;
}
