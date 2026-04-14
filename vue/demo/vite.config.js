import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { version } from "../../package.json";

const repoRoot = resolve(fileURLToPath(import.meta.url), "../../..");

export default defineConfig({
  server: {
    fs: { allow: [repoRoot] },
  },
  define: {
    "process.env.VERSION": `"${version}"`,
  },
  esbuild: {
    minify: false,
  },
  plugins: [vue()],
});
