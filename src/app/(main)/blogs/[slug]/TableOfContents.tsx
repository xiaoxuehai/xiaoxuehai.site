'use client';

import type { Variants } from 'framer-motion';

import { motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

import { Animate } from '@/enum';
import { cn } from '@/lib/utils';

export interface Headling {
  text: string | null;
  level: string;
  id: string;
}
const listVariants: Variants = {
  [Animate.Hidden]: {
    opacity: 0,
  },
  [Animate.Show]: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};
const itemVariants: Variants = {
  [Animate.Hidden]: {
    filter: 'blur(4px)',
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
  [Animate.Show]: {
    filter: 'blur(0px)',
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -1000 },
    },
  },
};

export function TableOfContents({ headings }: { headings: Headling[] }) {
  const [highlightedHeadingId, setHighlightedHeadingId] = useState<
    string | null
  >(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const articleElement = document.querySelector<HTMLElement>('#markdown');
      if (articleElement) {
        const nodes = headings.map(item => {
          const el = articleElement.querySelector<HTMLAnchorElement>(
            `${item.level}:where([id="${item.id}"])`,
          );
          if (!el) return null;

          return el.getBoundingClientRect();
        });
        let highlightedHeadingId = null;
        if (scrollY.get() < articleElement.scrollHeight) {
          const index = nodes.findIndex(node => (node?.top ?? 0) > 0);
          if (index === -1) {
            highlightedHeadingId = headings[headings.length - 1]?.id ?? null;
          } else {
            highlightedHeadingId = headings[index]?.id ?? null;
          }
        }
        setHighlightedHeadingId(highlightedHeadingId);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings, scrollY]);

  return (
    <motion.ul
      initial={Animate.Hidden}
      animate={Animate.Show}
      variants={listVariants}
      className='pointer-events-auto flex flex-col space-y-2 text-zinc-500'
    >
      {headings.map(item => (
        <motion.li
          key={item.id}
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            transition: {
              duration: 0.2,
            },
          }}
          className={cn(
            'text-sm font-medium text-zinc-700 transition-colors duration-200 hover:scale-105 hover:font-bold hover:text-zinc-900 dark:text-zinc-400 hover:dark:text-zinc-100',
            item.level === 'h3' && 'ml-2',
            item.level === 'h4' && 'ml-4',
            item.level === 'h5' && 'ml-6',
            item.id === highlightedHeadingId &&
              'font-bold text-zinc-900 dark:text-zinc-100',
          )}
        >
          <a
            href={`#${item.id}`}
            className='block w-full truncate'
            title={item.text!}
          >
            {item.text}
          </a>
        </motion.li>
      ))}
    </motion.ul>
  );
}
