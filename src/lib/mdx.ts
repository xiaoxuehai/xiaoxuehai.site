import fs from 'fs/promises';
import path from 'path';

import glob from 'fast-glob';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export type Frontmatter = {
  title: string; // 标题
  date: string; // 创建日期
  updatedOn?: string; // 最后更新日期，git commit 之前会自动更新此字段
  tags?: string[]; // 标签
  draft?: boolean; // 为 true 则不会展示该文章，默认为 false
  description: string;
  [key: string]: any;
};
export type ContentType = 'blogs' | 'notes';
export type BlogItem = {
  slug: string;
  frontmatter: Frontmatter;
};

export const CONTENT_DIR = 'src/content';

export async function getAllFilesFrontmatter(type: ContentType) {
  const contents: string[] = await glob(`${CONTENT_DIR}/${type}/*.mdx`);

  return await Promise.all(
    contents.map(async content => {
      const slug = content.split('/').pop()?.replace('.mdx', '') as string;
      const frontmatter = await getFileFrontmatter(type, slug!);
      return {
        slug,
        frontmatter,
        readingTime: readingTime(content.replace(/\s/g, '')),
      };
    }),
  );
}

export async function getFileFrontmatter(
  type: ContentType,
  slug: string,
): Promise<Frontmatter> {
  const source = await fs.readFile(
    path.join(process.cwd(), CONTENT_DIR, type, `${slug}.mdx`),
    'utf8',
  );
  const frontmatter = matter(source).data as Frontmatter;
  return frontmatter;
}

export async function getAdjacentFile(type: ContentType, slug: string) {
  const files = await getAllFilesFrontmatter(type);
  const index = files.findIndex(item => item.slug === slug);
  const prev = index > 0 ? files[index - 1] : null;
  const next =
    index !== -1 && index < files.length - 1 ? files[index + 1] : null;
  return { prev, next };
}
