import type { Config } from '@jest/types';

export default (): Config.InitialOptions => {
  return {
    modulePathIgnorePatterns: ['dist/', 'stubs'], // 'dist/' matches only "dist" at root, so that it does not ignore file names containing "dist", e.g. "distributedLockManager.int.test"
    verbose: false,
    testPathIgnorePatterns: ['lib', 'dist/', 'stubs', 'mocks', 'ignore', 'node_modules'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    //setupFiles: ['dotenv/config'], // <- Looks for an .env file next to jest.config.ts
    collectCoverage: true,
    coverageThreshold: {
      global: {
        statements: 40,
        branches: 15,
        lines: 45,
        functions: 19,
      },
    },
    coverageReporters: ['json-summary', 'lcov', 'cobertura'],
    reporters: ['default', 'jest-junit'],
    watchPathIgnorePatterns: ['jest.config.json', 'coverage'],
    transform: {
      '^.+\\.tsx?$': [
        'ts-jest',
        // required due to custom location of tsconfig.json configuration file
        // https://kulshekhar.github.io/ts-jest/docs/getting-started/options/tsconfig
        { tsconfig: './tsconfig-tests.json' },
      ],
    },
    bail: true,
  };
};
