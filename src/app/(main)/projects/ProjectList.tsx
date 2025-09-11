'use client';
import type { Variants } from 'framer-motion';

import { motion } from 'framer-motion';
import NextLink from 'next/link';
import React from 'react';
import { AiFillGithub, AiOutlineGlobal } from 'react-icons/ai';

import { Animate } from '@/enum';

import type { projects } from './data';
export interface ProjectListProps {
  data: typeof projects;
}

export function ProjectList({ data }: ProjectListProps) {
  const listVariants: Variants = {
    [Animate.Hidden]: {
      opacity: 0,
    },
    [Animate.Show]: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
        delay: 0.2,
      },
    },
  };
  const itemVariants: Variants = {
    [Animate.Hidden]: {
      filter: 'blur(10px)',
      y: -100,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        y: { stiffness: 100 },
      },
    },
    [Animate.Show]: {
      filter: 'blur(0px)',
      y: 0,
      opacity: 1,
      scale: 1,
      animationTimingFunction: 'linear',
      transition: {
        duration: 0.2,
        y: { stiffness: 100 },
      },
    },
  };
  return (
    <motion.ul
      className='grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 sm:gap-12 sm:py-16 lg:grid-cols-3'
      initial={Animate.Hidden}
      animate={Animate.Show}
      variants={listVariants}
    >
      {data.map((item, index) => (
        <motion.li
          className='group relative'
          variants={itemVariants}
          key={item.link + index}
        >
          <div className='absolute -inset-x-4 -inset-y-4 z-0 scale-50 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:-inset-y-6 sm:rounded-xl'></div>

          <div className='relative z-10'>
            <div className='flex w-full items-center justify-between'>
              <h2 className='text-base font-semibold text-zinc-800 dark:text-zinc-100'>
                {item.title}
              </h2>
              <div className='flex gap-x-2'>
                {item.source && (
                  <NextLink
                    target='_blank'
                    href={item.source}
                    className='text-xl text-zinc-400 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-400'
                  >
                    <AiFillGithub />
                  </NextLink>
                )}
                {item.link && (
                  <NextLink
                    target='_blank'
                    href={item.link}
                    className='text-xl text-zinc-400 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-400'
                  >
                    <AiOutlineGlobal />
                  </NextLink>
                )}
              </div>
            </div>

            <p className='mt-2 text-sm text-zinc-600 dark:text-zinc-400'>
              {item.description}
            </p>
            <p className='mt-3 flex flex-wrap gap-1'>
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className='inline-flex items-center rounded-full bg-zinc-100 px-2 text-xs leading-5 text-zinc-600 hover:text-primary dark:bg-zinc-800 dark:text-zinc-200 dark:hover:text-primary'
                >
                  {tag}
                </span>
              ))}
            </p>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}
