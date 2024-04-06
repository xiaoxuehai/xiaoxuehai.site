'use client';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import type { BlogItem } from '@/lib/mdx';

import { MDXContent } from './MDXContent';
import { Headling, TableOfContents } from './TableOfContents';
export type BlogContentProps = {
  code: string;
  prev: BlogItem | null;
  next: BlogItem | null;
};
export function BlogContent({ code, prev, next }: BlogContentProps) {
  const [headings, setHeadings] = useState<Headling[]>([]);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll(
        '#markdown > h2, #markdown > h3, #markdown > h4, #markdown > h5',
      ),
    )
      .filter(element => element.id)
      .map(element => ({
        id: element.id,
        text: element.id,
        level: element.tagName.toLocaleLowerCase(),
      }));
    setHeadings(headings);
  }, [code]);
  return (
    <div className='flex w-full justify-between'>
      <article
        id='markdown'
        className='prose w-0 max-w-none flex-1 dark:prose-invert'
      >
        <MDXContent code={code} />

        <div className='my-16 flex justify-between space-x-6 font-medium sm:space-x-12 sm:text-lg'>
          {/* 上一篇 */}
          <span className='w-1/2'>
            {!!prev && (
              <NextLink
                className='group flex h-full items-center gap-2 rounded-xl border border-zinc-400/20 p-3 no-underline transition sm:p-5'
                href={`/blogs/${prev.slug}`}
              >
                <FiChevronLeft className='ease-out-back shrink-0 text-xl text-teal-500 transition duration-500 dark:text-teal-400 sm:text-2xl sm:group-hover:-translate-x-2' />
                {prev.frontmatter.title}
              </NextLink>
            )}
          </span>
          {/* 下一篇 */}
          <span className='w-1/2 text-right'>
            {!!next && (
              <NextLink
                className='group flex h-full items-center justify-end gap-2 rounded-xl border border-zinc-400/20 p-3 no-underline transition sm:p-5'
                href={`/blogs/${next.slug}`}
              >
                {next.frontmatter.title}
                <FiChevronRight className='ease-out-back shrink-0 text-xl text-teal-500 transition duration-500 dark:text-teal-400 sm:text-2xl sm:group-hover:translate-x-2' />
              </NextLink>
            )}
          </span>
        </div>
      </article>

      <aside className='hidden w-52 flex-shrink-0 py-10 pl-6 md:block'>
        <div
          className='sticky top-24'
          style={{ maxHeight: 'calc(100vh - 320px)' }}
        >
          {headings?.length && <TableOfContents headings={headings} />}
        </div>
      </aside>
    </div>
  );
}
