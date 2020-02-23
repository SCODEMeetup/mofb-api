module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/test/**/*.test.[jt]s?(x)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ]
};