import { defineConfig } from "vitest/config";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "intl-tel-input/intlTelInputWithUtils": path.resolve(__dirname, "dist/js/intlTelInputWithUtils.mjs"),
      "intl-tel-input/utils": path.resolve(__dirname, "dist/js/utils.js"),
      "intl-tel-input": path.resolve(__dirname, "dist/js/intlTelInput.mjs"),
    },
  },
  test: {
    globals: true,
    include: ["tests/**/*.test.js"],
    pool: "forks",
    forks: {
      execArgv: ["--disable-warning=DEP0040"],
    },
    coverage: {
      provider: "v8",
      include: ["src/js/**/*.ts"],
      exclude: [
        "src/js/i18n/**",
        "src/js/types/**",
      ],
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "coverage",
    },
  },
});
