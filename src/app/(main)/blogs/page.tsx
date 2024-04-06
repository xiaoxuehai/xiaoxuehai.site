import dayjs from 'dayjs';

import { Container } from '@/components/Container';
import { type BlogItem, getAllFilesFrontmatter } from '@/lib/mdx';

import { BlogList, type FormatedBlogItem } from './BlogList';

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
  const blogs = await getAllFilesFrontmatter('blogs');
  const formatedBlogs = formatBlogs(blogs);

  return (
    <Container>
      <BlogList formatedBlogs={formatedBlogs} />
    </Container>
  );
}
