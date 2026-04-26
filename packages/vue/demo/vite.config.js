import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { version } from "../package.json";

const demoRoot = resolve(fileURLToPath(import.meta.url), "..");
const repoRoot = resolve(demoRoot, "../../..");

export default defineConfig({
  root: demoRoot,
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
