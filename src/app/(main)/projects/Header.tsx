'use client';
import type { Variants } from 'framer-motion';

import { motion } from 'framer-motion';

import { Animate } from '@/enum';
export interface HeaderProps {
  title: string;
  description: string;
}
export function Header({ title, description }: HeaderProps) {
  const variants: Variants = {
    [Animate.Hidden]: {
      filter: 'blur(10px)',
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.2,
      },
    },
    [Animate.Show]: {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      animationTimingFunction: 'linear',
      transition: {
        duration: 0.2,
      },
    },
  };
  return (
    <motion.header
      initial={Animate.Hidden}
      animate={Animate.Show}
      variants={variants}
      className='mt-6 max-w-2xl sm:mt-14'
    >
      <h1 className='text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl'>
        {title}
      </h1>
      <p className='mt-6 text-base text-zinc-600 dark:text-zinc-400'>
        {description}
      </p>
    </motion.header>
  );
}
