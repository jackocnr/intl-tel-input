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
  plugins: [vue(), dts({ tsconfigPath: "./tsconfig.app.json" })],
});