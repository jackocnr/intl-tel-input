// needed for svelte component demo page

import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

const projectRoot = fileURLToPath(new URL("../../..", import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      // The Svelte component imports from "intl-tel-input" (self-referencing package),
      // which Vite/Rollup can't resolve from the UMD build output, so alias to source.
      { find: /^intl-tel-input\/intlTelInputWithUtils$/, replacement: path.resolve(projectRoot, "../src/js/intl-tel-input/intlTelInputWithUtils.ts") },
      { find: /^intl-tel-input$/, replacement: path.resolve(projectRoot, "../src/js/intl-tel-input.ts") },
    ],
  },
  define: {
    "process.env.VERSION": "window.IGNORE_ME", // just to stop runtime errors
    "process.env.NODE_ENV": "'production'", // required for vue files
  },
  build: {
    outDir: path.resolve(projectRoot, "build/examples/js"),
    emptyOutDir: false,
    copyPublicDir: false,
    rollupOptions: {
      // stop vite/rollup from complaining about the dynamic import of utils.js
      external: (id) => id.startsWith("/intl-tel-input/js/utils.js"),
    },
    lib: {
      entry: path.resolve(projectRoot, "src/examples/js/svelte_main.js"),
      formats: ["cjs"],
      fileName: "svelte_component_bundle",
    },
  },
  plugins: [svelte()],
});
