/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js,jsx,ts,tsx}': ['eslint --fix --max-warnings=0', 'prettier --write'],
  '*.{json,css,html,md,mdx}': ['prettier --write'],
  'src/content/*/*.{mdx}': ['tsx ./scripts/update-frontmatter.ts'],
};
