'use client';
import dayjs from 'dayjs';
import { motion, type Variants } from 'framer-motion';
import NextLink from 'next/link';

import { FiCalendar, FiTag } from 'react-icons/fi';

import { Animate } from '@/enum';

import type { BlogItem } from '@/lib/mdx';

export type FormatedBlogItem = {
  blogs: BlogItem[];
  year: number;
};
export type BogListProps = {
  formatedBlogs: FormatedBlogItem[];
};
export function BlogList({ formatedBlogs }: BogListProps) {
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
      y: -50,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
      },
    },
    [Animate.Show]: {
      filter: 'blur(0px)',
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className='py-4 sm:py-8'
      initial={Animate.Hidden}
      animate={Animate.Show}
      variants={listVariants}
    >
      {formatedBlogs.map(item => (
        <div key={item.year} className='mb-12 sm:flex'>
          <motion.h1
            variants={itemVariants}
            className='mr-10 text-2xl font-bold leading-7 text-zinc-800 dark:text-zinc-200 sm:mt-6'
          >
            <span className='text-teal-500'>#</span> {item.year}
          </motion.h1>
          <ul className='flex-1 divide-y divide-gray-100 text-zinc-800 dark:divide-gray-100/10 dark:text-zinc-200'>
            {item.blogs.map(({ slug, frontmatter }) => (
              <motion.li
                key={slug}
                variants={itemVariants}
                className='max-w-none py-2 sm:py-4'
              >
                <div className='flex justify-between py-2'>
                  <NextLink
                    href={`/blogs/${slug}`}
                    className='block text-lg font-medium transition-colors hover:text-teal-600 dark:hover:text-teal-500 sm:text-xl'
                  >
                    <h2>{frontmatter.title}</h2>
                  </NextLink>
                  <div className='ml-2 flex h-7 flex-shrink-0 items-center text-sm leading-7 text-zinc-500 dark:text-zinc-300'>
                    <FiCalendar className='mr-1 text-sm' />
                    <time>
                      {dayjs(frontmatter.date).format('YYYY年MM月DD日')}
                    </time>
                  </div>
                </div>
                <div className='m-auto flex flex-wrap items-center gap-2 text-sm sm:gap-3'>
                  {frontmatter.tags?.map((tag: string) => (
                    <NextLink
                      key={tag}
                      className='flex items-center rounded-full bg-teal-500/15 px-2.5 py-0.5 align-middle font-medium text-primary text-teal-500 dark:text-teal-400'
                      href={`/tags/${tag}`}
                      prefetch={false}
                    >
                      <FiTag className='mr-1' /> {tag}
                    </NextLink>
                  ))}
                </div>
                <div className='py-2 font-extralight text-gray-500 dark:text-gray-300'>
                  {frontmatter.description}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      ))}
    </motion.div>
  );
}
