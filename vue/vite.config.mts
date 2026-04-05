import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { version } from "../package.json";
import dts from "vite-plugin-dts";
import {resolve} from "node:path";

export default defineConfig({
  root: "vue",
  define: {
    "process.env.VERSION": `"${version}"`,
  },
  build: {
    outDir: "build",
    emptyOutDir: true,
    lib: {
      entry: [
        resolve(__dirname, "src/exports/IntlTelInput.ts"),
        resolve(__dirname, "src/exports/IntlTelInputWithUtils.ts"),
      ],
      formats: ["es"],
      fileName: "exports/[name]",
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
  plugins: [vue(), dts({ tsconfigPath: "./tsconfig.app.json" })],
});