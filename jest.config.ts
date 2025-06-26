export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^store/(.*)$': '<rootDir>/src/store/$1',
  },
 setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
