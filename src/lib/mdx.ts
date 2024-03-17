import fs from 'fs/promises';
import path from 'path';

import glob from 'fast-glob';
import matter from 'gray-matter';
import readingTime from 'reading-time';

import { ContentType, Frontmatter } from '@/types/mdx';
const CONTENT_DIR = 'src/content';
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
