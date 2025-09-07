import chalk from 'chalk';
import dayjs from 'dayjs';
import matter from 'gray-matter';
import fs from 'node:fs/promises';
async function updateFrontmatter() {
  const [paths] = process.argv.slice(2);

  for (const path of paths) {
    const file = matter.read(path);
    const updatedOn = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const content = matter.stringify(file.content, {
      ...file.data,
      updatedOn,
    });
    await fs.writeFile(path, content);
    console.log(
      chalk.green(`${path} 已更新frontmatter，更新时间：${updatedOn}`),
    );
  }
}
updateFrontmatter();
