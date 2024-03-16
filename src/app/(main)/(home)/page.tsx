'use client';
import { motion, type Variants } from 'framer-motion';
import NextLink from 'next/link';

import { PropsWithChildren } from 'react';
import {
  AiFillMail,
  AiFillWechat,
  AiOutlineGithub,
  AiOutlineQq,
} from 'react-icons/ai';

import { Container } from '@/components/Container';
import { ShimmerButton } from '@/components/ShimmerButton';
import { Animate } from '@/enum';

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
  const IconWrapper = ({ children }: PropsWithChildren) => (
    <div className='cursor-pointer text-zinc-500 transition hover:text-zinc-800 dark:text-zinc-200 dark:hover:text-zinc-500'>
      {children}
    </div>
  );
  return (
    <Container className='relative z-50 px-4 pt-8 sm:px-10 sm:pt-32'>
      <motion.div
        initial={Animate.Hidden}
        animate={Animate.Show}
        variants={listVariants}
        className='z-10 h-full'
      >
        <header className='text-3xl font-bold leading-normal tracking-tight text-zinc-800 dark:text-zinc-200 sm:text-4xl sm:leading-relaxed'>
          <motion.p variants={itemVariants}>你好👋，我是XiaoXueHai，</motion.p>
          <motion.p variants={itemVariants}>
            在这里我会分享开发过程中所遇到问题与解决方案。
          </motion.p>
        </header>
        <div className='mt-12 leading-relaxed'>
          <motion.p variants={itemVariants} className='text-xl'>
            技术宅，喜欢探索和尝试各种新奇事物，对开发充满热情，
          </motion.p>
          <motion.p variants={itemVariants} className='text-xl'>
            对于我来说，编码不仅仅是一项工作，更是一种乐趣和探索的过程。
          </motion.p>

          <motion.div
            variants={itemVariants}
            className='mt-8 flex gap-6 text-2xl'
          >
            <IconWrapper>
              <a href='' target='_blank'>
                <AiOutlineGithub />
              </a>
            </IconWrapper>
            <IconWrapper>
              <AiOutlineQq />
            </IconWrapper>
            <IconWrapper>
              <AiFillWechat />
            </IconWrapper>
            <IconWrapper>
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
