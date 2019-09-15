module.exports = {
  env: {
    commonjs: true,
    node: true,
    mocha: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'func-names': 0,
    'no-use-before-define': ['error', { functions: false }],
    'no-param-reassign': 'warn',
    'no-unused-vars': 'warn',
    'class-methods-use-this': 0,
  },
};
