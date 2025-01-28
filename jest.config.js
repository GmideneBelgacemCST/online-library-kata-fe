module.exports = {
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy', // CSS modules
    '\\.css$': '<rootDir>/src/styleMock.js', // Regular CSS
  },
  testEnvironment: 'jsdom',
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  };