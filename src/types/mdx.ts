export type Frontmatter = {
  title: string; // 标题
  date: string; // 创建日期
  updatedOn?: string; // 最后更新日期，git commit 之前会自动更新此字段
  tags?: string[]; // 标签
  draft?: boolean; // 为 true 则不会展示该文章，默认为 false
  description: string;
  [key: string]: any;
};
export type ContentType = 'blog' | 'projects' | 'about';
export type BlogItem = {
  slug: string;
  frontmatter: Frontmatter;
};
