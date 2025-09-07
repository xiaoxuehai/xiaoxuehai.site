import type { RehypeShikiOptions } from '@shikijs/rehype';
import type { Options } from 'rehype-autolink-headings';

import rehypeShiki from '@shikijs/rehype';
import dayjs from 'dayjs';
import { bundleMDX } from 'mdx-bundler';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { FiCalendar, FiClock, FiRefreshCw, FiTag } from 'react-icons/fi';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import type { Frontmatter } from '@/lib/mdx';

import { Container } from '@/components/Container';
import { CONTENT_DIR, getAdjacentFile } from '@/lib/mdx';

import { BlogContent } from './BlogContent';

export default async function BlogDetail(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const slug = decodeURIComponent(params.slug);
  const filePath = `/${CONTENT_DIR}/${slug}.mdx`;
  try {
    await access(path.join(process.cwd(), filePath));
  } catch (error) {
    console.error(error);
    notFound();
  }

  const source = (
    await readFile(path.join(process.cwd(), filePath))
  ).toString();
  const { code, frontmatter } = await bundleMDX<Frontmatter>({
    source,
    mdxOptions(options) {
      return {
        ...options,
        remarkPlugins: [...(options.remarkPlugins ?? []), remarkGfm],
        rehypePlugins: [
          ...(options.rehypePlugins ?? []),
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' } as Options],
          [
            rehypeShiki,
            {
              themes: {
                light: 'vitesse-light',
                dark: 'vitesse-dark',
              },
              addLanguageClass: true,
              parseMetaString(metaString: string) {
                const meta = {
                  filename: metaString.match(/filename="([^"]+)"/)?.[1],
                };
                return meta;
              },
            } as RehypeShikiOptions,
          ],
        ],
      };
    },
  });

  const readTimeResult = readingTime(source.replace(/\s/g, ''));

  const { prev, next } = await getAdjacentFile(slug);

  return (
    <Container>
      <h1 className='mt-6 text-3xl font-medium !leading-snug text-black dark:text-white sm:text-5xl'>
        {frontmatter.title}
      </h1>
      <div className='mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-400 dark:text-zinc-500'>
        <div className='flex items-center'>
          <FiCalendar className='text-sm' />
          <span className='ml-1'>
            创建于：{dayjs(frontmatter.date).format('YYYY年MM月DD日')}
          </span>
        </div>
        <div className='flex items-center'>
          <FiClock className='text-sm' />
          <span className='ml-1'>
            {Math.round(readTimeResult.minutes)}分钟阅读
          </span>
        </div>
        <div className='flex items-center'>
          <FiRefreshCw className='text-sm' />
          <span className='ml-1'>
            更新于：
            {dayjs(frontmatter.updatedOn || frontmatter.date).format(
              'YYYY年MM月DD日',
            )}
          </span>
        </div>
      </div>

      <div className='my-4 flex flex-wrap items-center gap-2 text-sm sm:my-6 sm:gap-3'>
        {frontmatter.tags?.map((tag: string) => (
          <NextLink
            key={tag}
            className='flex items-center rounded-full bg-teal-500/15 px-2.5 py-0.5 font-medium text-teal-500 dark:text-teal-400'
            href={`/tags/${tag}`}
            prefetch={false}
          >
            <FiTag className='mr-1' />
            {tag}
          </NextLink>
        ))}
      </div>
      <BlogContent code={code} prev={prev} next={next} />
    </Container>
  );
}
