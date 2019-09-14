module.exports = {
  env: {
    commonjs: true,
    node: true,
    mocha: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  },
};
