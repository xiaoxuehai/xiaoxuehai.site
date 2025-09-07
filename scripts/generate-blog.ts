import dayjs from 'dayjs';
import fs from 'node:fs/promises';
import path from 'node:path';

async function generateBlog() {
  const [name, ...tags] = process.argv.slice(2);
  await fs.writeFile(
    path.join(process.cwd(), `src/mdxs/${name}.mdx`),
    `---
title: '${name}'
description: ''
date: '${dayjs().format('YYYY-MM-DD')}'
tags:${tags.map(tag => `\n  - '${tag}'`).join('')}
---`,
  );
}

generateBlog();
