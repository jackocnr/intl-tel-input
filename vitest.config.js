import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sharedAlias = {
  "intl-tel-input/intlTelInputWithUtils": path.resolve(__dirname, "dist/js/intlTelInputWithUtils.mjs"),
  "intl-tel-input/utils": path.resolve(__dirname, "dist/js/utils.js"),
  "intl-tel-input": path.resolve(__dirname, "dist/js/intlTelInput.mjs"),
};

export default defineConfig({
  resolve: { alias: sharedAlias },
  test: {
    globals: true,
    coverage: {
      provider: "v8",
      include: ["src/js/**/*.ts"],
      exclude: ["src/js/i18n/**", "src/js/types/**"],
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "coverage",
    },
    projects: [
      {
        resolve: { alias: sharedAlias },
        test: {
          globals: true,
          name: "node",
          include: ["tests/**/*.test.js"],
          exclude: ["tests/integration/react/**"],
          pool: "forks",
          forks: { execArgv: ["--disable-warning=DEP0040"] },
        },
      },
      {
        resolve: { alias: sharedAlias },
        test: {
          globals: true,
          name: "browser",
          include: ["tests/integration/react/**/*.test.{js,jsx}"],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
