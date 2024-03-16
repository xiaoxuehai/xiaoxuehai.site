'use client';

import { motion, type Variants } from 'framer-motion';

import { ReactNode } from 'react';
import React from 'react';

import { Animate } from '@/enum';
export type AboutContentProps = {
  items: {
    title: ReactNode;
    content: ReactNode;
  }[];
};
export function AboutContent({ items }: AboutContentProps) {
  const listVariants: Variants = {
    [Animate.Hidden]: {
      opacity: 0,
    },
    [Animate.Show]: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  };
  const itemVariants: Variants = {
    [Animate.Hidden]: {
      filter: 'blur(10px)',
      y: -50,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    [Animate.Show]: {
      filter: 'blur(0px)',
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <motion.div
      initial={Animate.Hidden}
      animate={Animate.Show}
      variants={listVariants}
      className='prose max-w-full py-2 dark:prose-invert sm:py-4'
    >
      {items.map((item, index) => (
        <motion.div key={index} variants={itemVariants}>
          <h2 className='mt-6 text-lg sm:mb-6 sm:mt-10 sm:text-2xl'>
            {item.title}
          </h2>
          {item.content}
        </motion.div>
      ))}
    </motion.div>
  );
}
