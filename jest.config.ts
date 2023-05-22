import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  setupFiles: ["dotenv/config"],
  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: ["js", "ts", "tsx"],
  setupFilesAfterEnv: ["<rootDir>/test/setup-test-env.ts"],
  transform: {
    "\\.tsx?$": [
      "ts-jest",
      {
        isolatedModules: true,
      },
    ],
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/app/$1",
  },
};

export default jestConfig;
