'use client';

import { motion, type Variants } from 'framer-motion';

import NextLink from 'next/link';
import React from 'react';

import { Container } from '@/components/Container';
import { Animate } from '@/enum';

export default function About() {
  const stack = [
    'Vue',
    'React',
    'TypeScript',
    'NodeJS',
    'NestJS',
    'NextJs',
    'TailwindCss',
  ];
  const listVariants: Variants = {
    [Animate.Hidden]: {
      opacity: 0,
    },
    [Animate.Show]: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
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
        y: { stiffness: 100 },
      },
    },
    [Animate.Show]: {
      filter: 'blur(0px)',
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        y: { stiffness: 100 },
      },
    },
  };
  const items = [
    {
      title: '🎨 关于本站',
      content: (
        <ul>
          <li>
            搭建它的初衷主要是为了体验NextJs的一些新特性，其次是记录笔记 +
            分享一些平时遇到的问题解决经验，本站技术栈为
            Next.js、TypeScript、TailwindCSS、MDX
          </li>
        </ul>
      ),
    },
    {
      title: '📜 本站历史',
      content: (
        <ul>
          <li>2023 - 至今，使用 Next.js 开发，部署在 Vercel</li>
          <li>2020 - 2021，初版使用 Hexo 搭建，部署在腾讯云服务器</li>
        </ul>
      ),
    },
    {
      title: '👋 关于我',
      content: (
        <ul>
          <li>
            <div>
              一个前端开发工程师（2020年 - 至今），目前从事于 toB
              行业，喜欢学习新技术，我的技能 👇🏻
            </div>

            <div className='mb-6 flex flex-wrap items-start gap-3'>
              {stack.map(item => (
                <span
                  key={item}
                  className='rounded-full bg-amber-500/15 px-2 py-1 text-sm leading-none text-amber-900 dark:text-amber-500'
                >
                  {item}
                </span>
              ))}
            </div>
          </li>
        </ul>
      ),
    },
    {
      title: '📮 找到我',
      content: (
        <ul>
          <li>
            Email-
            <NextLink href='mailto:1379228273@qq.com'>
              1379228273@qq.com
            </NextLink>
          </li>
          <li>
            Github-
            <a href='https://github.com/xiaoxuehai'>
              https://github.com/xiaoxuehai
            </a>
          </li>
        </ul>
      ),
    },
  ];
  return (
    <Container>
      <motion.div
        initial={Animate.Hidden}
        animate={Animate.Show}
        variants={listVariants}
        className='prose max-w-full py-2 dark:prose-invert sm:py-4'
      >
        {items.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <h2 className='mb-4 mt-6 text-lg sm:mb-6 sm:mt-10 sm:text-2xl'>
              {item.title}
            </h2>
            {item.content}
          </motion.div>
        ))}
      </motion.div>
    </Container>
  );
}
