module.exports = {
  rules: {
    "type-enum": [2, 'always', [
      'feat',
      'fix',
      'docs',
      'style',
      'refactor',
      'perf',
      'test',
      'chore',
      'revert'
    ]
    ]
  },
  extends: ['@commitlint/config-angular']
};
