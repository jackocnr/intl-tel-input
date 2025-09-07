import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests-e2e",
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: "http://localhost:4173",
    trace: "on-first-retry",
  },
  webServer: {
    command: "./node_modules/.bin/http-server -p 4173 -c-1 .",
    url: "http://localhost:4173/tests-e2e/fixtures/vanilla.html",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});