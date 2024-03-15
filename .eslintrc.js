module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'unused-imports', 'import', 'prettier'],
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {
    // 模块导入顺序规则
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
        'newlines-between': 'always-and-inside-groups',
        warnOnUnassignedImports: true,
      },
    ],
    // 自动删除未使用的导入
    // https://github.com/sweepline/eslint-plugin-unused-imports
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': 'error',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-mutable-exports': 'off',
    'prettier/prettier': 'error',
    'no-param-reassign': 'off', // 禁止可以修改参数
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'no-multiple-empty-lines': ['error', { max: 1 }], // 不允许多个空行
    'no-use-before-define': 'off', // 禁止在 函数/类/变量 定义之前使用它们
    'no-irregular-whitespace': 'off', // 禁止不规则的空白
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // 禁止定义未使用的变量
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
    '@typescript-eslint/ban-ts-ignore': 'off', // 禁止使用 @ts-ignore
    '@typescript-eslint/no-non-null-assertion': 'off', // 不允许使用后缀运算符的非空断言(!)
    '@typescript-eslint/no-var-requires': 'off',
    'react/jsx-curly-spacing': ['error', { when: 'never', children: true }],
    'react/jsx-props-no-multi-spaces': 'error',
  },
  globals: {
    React: true,
    JSX: true,
  },
};
