import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { version } from "./package.json";
import dts from "vite-plugin-dts";
import {resolve} from "node:path";

export default defineConfig({
  root: "packages/vue",
  define: {
    "process.env.VERSION": `"${version}"`,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: [
        resolve(__dirname, "src/index.ts"),
        resolve(__dirname, "src/indexWithUtils.ts"),
      ],
      formats: ["es"],
      fileName: (_, entryName) => entryName === "index" ? "IntlTelInput.js" : "IntlTelInputWithUtils.js",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [
    vue(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      entryRoot: "src",
      // Without this, vite-plugin-dts would resolve the `intl-tel-input` tsconfig path alias and emit a relative path (e.g. `../../../dist/js/intlTelInput.d.ts`) into the generated .d.ts files. We want the bare package specifier preserved so consumers import from the published package.
      aliasesExclude: [/^intl-tel-input$/],
    }),
  ],
});