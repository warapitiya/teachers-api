module.exports = {
  types: [
    {
      value: 'feat',
      name: 'feat:\t\tA new feature'
    },
    {
      value: 'fix',
      name: 'fix:\t\tA bug fix'
    },
    {
      value: 'docs',
      name: 'docs:\t\tDocumentation only changes'
    },
    {
      value: 'style',
      name: 'style:\tChanges that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)'
    },
    {
      value: 'refactor',
      name: 'refactor:\tA code change that neither fixes a bug nor adds a feature'
    },
    {
      value: 'perf',
      name: 'perf:\t\tA code change that improves performance'
    },
    {
      value: 'test',
      name: 'test:\t\tAdding missing tests'
    },
    {
      value: 'chore',
      name: 'chore:\tChanges to the build process or auxiliary tools and libraries such as documentation generation'
    },
    {
      value: 'revert',
      name: 'revert:\tRevert to a commit'
    }
  ],
  scopes: [
    'app',
    'admin',
    'teachers',
    'students'
  ],
  allowBreakingChanges: ['feat', 'fix', 'perf']

};
