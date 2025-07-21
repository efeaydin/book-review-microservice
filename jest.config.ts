import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm', // important: ESM preset
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true, tsconfig: 'tsconfig.jest.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    '(.+)\\.js': '$1',
  },
};

export default config;
