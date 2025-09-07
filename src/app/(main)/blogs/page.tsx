import dayjs from 'dayjs';

import type { BlogItem } from '@/lib/mdx';

import { Container } from '@/components/Container';
import { getAllFilesFrontmatter } from '@/lib/mdx';

import type { FormatedBlogItem } from './BlogList';

import { BlogList } from './BlogList';

function formatBlogs(blogs: BlogItem[]) {
  const result: FormatedBlogItem[] = [];

  for (const blog of blogs) {
    blog.frontmatter.date = dayjs(blog.frontmatter.date).format('YYYY-MM-DD');
    const year = dayjs(blog.frontmatter.date).year();
    const item = result.find(item => item.year === year);

    if (item) {
      item.blogs.push(blog);
    } else {
      result.push({
        year,
        blogs: [blog],
      });
    }
  }

  return result;
}
export default async function Blogs() {
  const blogs = await getAllFilesFrontmatter();

  const formatedBlogs = formatBlogs(blogs);

  return (
    <Container>
      <BlogList formatedBlogs={formatedBlogs} />
    </Container>
  );
}
