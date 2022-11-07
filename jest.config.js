module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // moduleNameMapper: {
  //   '@common/(.*)': '<rootDir>/common/$1',
  //   '@network/(.*)': '<rootDir>/network/$1'
  // },
  modulePathIgnorePatterns: [
    "dist",
    "publish"
  ],
};
