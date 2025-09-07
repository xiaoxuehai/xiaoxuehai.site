'use client';
import type { Variants } from 'framer-motion';
import type { ComponentPropsWithoutRef } from 'react';

import { motion } from 'framer-motion';
import NextLink from 'next/link';
import {
  AiFillMail,
  AiFillWechat,
  AiOutlineGithub,
  AiOutlineQq,
} from 'react-icons/ai';

import { Container } from '@/components/Container';
import { ShimmerButton } from '@/components/ShimmerButton';
import { site } from '@/config/site';
import { Animate } from '@/enum';
import { cn } from '@/lib/utils';
export default function Page() {
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
      x: -50,
      opacity: 0,
      transition: { duration: 0.4 },
    },
    [Animate.Show]: {
      filter: 'blur(0px)',
      x: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };
  const IconWrapper = ({
    children,
    className,
    ...rest
  }: ComponentPropsWithoutRef<'a'>) => (
    <a
      className={cn(
        className,
        'text-zinc-500 transition hover:text-zinc-800 dark:text-zinc-200 dark:hover:text-zinc-500',
      )}
      {...rest}
    >
      {children}
    </a>
  );
  return (
    <Container>
      <motion.div
        initial={Animate.Hidden}
        animate={Animate.Show}
        variants={listVariants}
        className='h-full px-4 pt-8 sm:pt-32'
      >
        <header className='text-3xl font-bold leading-normal tracking-tight text-zinc-800 dark:text-zinc-200 sm:text-4xl sm:leading-relaxed'>
          <motion.p variants={itemVariants}>
            你好
            <span className='animate-wave inline-block origin-bottom-right px-1'>
              👋
            </span>
            ，我是一名前端开发者
          </motion.p>
          <motion.p variants={itemVariants}>
            在这里我会分享开发过程中所遇到问题与解决方案。
          </motion.p>
        </header>
        <div className='mt-12 leading-relaxed'>
          <motion.p variants={itemVariants} className='text-xl'>
            技术宅，喜欢探索和尝试各种技术栈，对开发充满热情
          </motion.p>
          <motion.p variants={itemVariants} className='text-xl'>
            对我而言，编码从不是机械的重复，敲下的每一行代码，都是解决问题的钥匙，更是探索技术边界的乐趣。
          </motion.p>

          <motion.div
            variants={itemVariants}
            className='mt-8 flex gap-6 text-2xl'
          >
            <IconWrapper href={site.github} target='_blank'>
              <AiOutlineGithub />
            </IconWrapper>
            <IconWrapper href={site.qq} target='_blank'>
              <AiOutlineQq />
            </IconWrapper>
            <IconWrapper href={site.wechat} target='_blank'>
              <AiFillWechat />
            </IconWrapper>
            <IconWrapper href={`mailto:${site.email}`} target='_blank'>
              <AiFillMail />
            </IconWrapper>
          </motion.div>
        </div>
        <motion.div variants={itemVariants} className='py-10'>
          <ShimmerButton>
            <NextLink
              href='/about'
              className='relative z-10 font-semibold text-white'
            >
              查看更多介绍
            </NextLink>
          </ShimmerButton>
        </motion.div>
      </motion.div>
    </Container>
  );
}
