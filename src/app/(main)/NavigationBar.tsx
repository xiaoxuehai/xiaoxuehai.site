'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import {
  useCallback,
  type HTMLAttributes,
  type PropsWithChildren,
  MouseEvent,
} from 'react';

import { NAVIGATION_ITEMS } from '@/config/app';
import { clsxm } from '@/lib/clsxm';

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
        className={clsxm(
          'relative flex h-full items-center whitespace-nowrap px-3 py-2 transition',
          isActive
            ? ' text-teal-500 dark:text-teal-400'
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
function Desktop({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = useMotionValue(0);
  const handleMouseMove = useCallback(
    ({ clientX, clientY, currentTarget }: MouseEvent) => {
      const { left, top, width, height } =
        currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
      radius.set(Math.sqrt(width ** 2 + height ** 2) / 2.5);
    },
    [mouseX, mouseY, radius],
  );
  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, var(--spotlight-color) 10%, transparent 75%)`;

  return (
    <nav
      onMouseMove={handleMouseMove}
      className={clsxm(
        'group relative',
        'rounded-full bg-gradient-to-b from-zinc-50/70 to-white/90',
        'shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md',
        'dark:from-zinc-900/70 dark:to-zinc-800/90 dark:ring-zinc-100/10',
        '[--spotlight-color:rgb(20,184,166,0.1)] dark:[--spotlight-color:rgb(20,184,166,0.3)]',
        className,
      )}
      {...rest}
    >
      <motion.span
        className='pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100'
        style={{ background }}
      />

      <ul className='flex h-full px-3 text-sm font-medium text-zinc-800 dark:text-zinc-200'>
        {NAVIGATION_ITEMS.map(({ href, text }) => (
          <DesktopNavItem key={href} href={href}>
            {text}
          </DesktopNavItem>
        ))}
      </ul>
    </nav>
  );
}
export function NavigationBar() {
  return (
    <>
      <Desktop />
    </>
  );
}
