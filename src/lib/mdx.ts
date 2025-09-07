import dayjs from 'dayjs';
import glob from 'fast-glob';
import matter from 'gray-matter';
import fs from 'node:fs/promises';
import path from 'node:path';
import readingTime from 'reading-time';

export interface Frontmatter {
  title: string; // 标题
  date: string; // 创建日期
  updatedOn?: string; // 最后更新日期，git commit 之前会自动更新此字段
  tags?: string[]; // 标签
  // draft?: boolean; // 为 true 则不会展示该文章，默认为 false
  description: string;
  [key: string]: any;
}
export type ContentType = 'blogs' | 'notes';
export interface BlogItem {
  slug: string;
  frontmatter: Frontmatter;
}

export const CONTENT_DIR = 'src/mdxs';

export async function getAllFilesFrontmatter() {
  const contents: string[] = await glob(`${CONTENT_DIR}/*.mdx`);

  const result = await Promise.all(
    contents.map(async content => {
      const slug = content.split('/').pop()?.replace('.mdx', '') as string;
      const frontmatter = await getFileFrontmatter(slug!);
      return {
        slug,
        frontmatter,
        readingTime: readingTime(content.replace(/\s/g, '')),
      };
    }),
  );
  return result.sort(
    (a, b) =>
      dayjs(b.frontmatter.date).valueOf() - dayjs(a.frontmatter.date).valueOf(),
  );
}

export async function getFileFrontmatter(slug: string): Promise<Frontmatter> {
  const source = await fs.readFile(
    path.join(process.cwd(), CONTENT_DIR, `${slug}.mdx`),
    'utf8',
  );
  const frontmatter = matter(source).data as Frontmatter;
  return frontmatter;
}

export async function getAdjacentFile(slug: string) {
  const files = await getAllFilesFrontmatter();
  const index = files.findIndex(item => item.slug === slug);
  const prev = index > 0 ? files[index - 1] : null;
  const next =
    index !== -1 && index < files.length - 1 ? files[index + 1] : null;
  return { prev, next };
}
