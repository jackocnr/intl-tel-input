import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import vue from "@vitejs/plugin-vue";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sharedAlias = {
  "intl-tel-input/intlTelInputWithUtils": path.resolve(__dirname, "packages/core/dist/js/intlTelInputWithUtils.mjs"),
  "intl-tel-input/utils": path.resolve(__dirname, "packages/core/dist/js/utils.js"),
  "intl-tel-input": path.resolve(__dirname, "packages/core/dist/js/intlTelInput.mjs"),
};

export default defineConfig({
  resolve: { alias: sharedAlias },
  define: {
    "process.env.NODE_ENV": JSON.stringify("test"),
  },
  optimizeDeps: {
    include: [
      "@angular/compiler",
      "@angular/core",
      "@angular/core/testing",
      "@angular/platform-browser/testing",
      "@testing-library/vue",
      "@testing-library/svelte",
      "zone.js",
      "zone.js/testing",
    ],
    esbuildOptions: {
      define: {
        "process.env.NODE_ENV": JSON.stringify("test"),
        "process.env": "({})",
        "process": "({env:{}})",
      },
    },
  },
  test: {
    globals: true,
    coverage: {
      provider: "v8",
      include: ["packages/core/src/js/**/*.ts"],
      exclude: ["packages/core/src/js/i18n/**", "packages/core/src/js/types/**"],
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
        plugins: [vue(), svelte()],
        test: {
          globals: true,
          name: "browser",
          include: [
            "tests/integration/react/**/*.test.{js,jsx}",
            "tests/integration/vue/**/*.test.{js,ts}",
            "tests/integration/svelte/**/*.test.{js,ts}",
            "tests/integration/angular/**/*.test.ts",
          ],
          setupFiles: [
            "tests/integration/process-shim.ts",
            "tests/integration/angular/setup.ts",
          ],
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
