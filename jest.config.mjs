/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  verbose: true,
  setupFiles: ["dotenv/config"],
  reporters: ["default", "github-actions"],
};
