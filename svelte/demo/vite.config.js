import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
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
  plugins: [svelte()],
});
