module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
    transformIgnorePatterns: ['node_modules/(?!(jest-test))'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  };