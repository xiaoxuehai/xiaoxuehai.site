/** @type {import('cz-git').UserConfig} */
module.exports = {
  ignores: [commit => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
    'type-enum': [
      2,
      'always',
      [
        'feat', //新增功能
        'fix', //修复缺陷
        'docs', //文档更新
        'style', //代码格式
        'refactor', //代码重构
        'perf', //性能提升
        'test', //测试相关
        'build', //构建相关
        'ci', //持续集成
        'revert', //回退代码
        'chore', //其他修改
      ],
    ],
  },
};
