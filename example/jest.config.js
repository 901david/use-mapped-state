module.exports = {
  verbose: true,
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/*.config.{js,jsx}',
    '!**/node_modules/**',
    '!**/build/**',
    '!**/coverage/**',
    '!**/vendor/**',
  ],
};
