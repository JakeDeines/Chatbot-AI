const { defaults } = require('jest-config');

module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@aws-amplify/ui-react/styles.css$': '<rootDir>/src/__mocks__/emptyStyleMock.js'
  },
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    "node_modules/(?!@aws-amplify/ui-react).+" 
  ]
};