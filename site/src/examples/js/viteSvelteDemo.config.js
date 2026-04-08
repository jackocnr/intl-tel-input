// needed for svelte component demo page

import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

const projectRoot = fileURLToPath(new URL("../../..", import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      // The Svelte component source imports from "intl-tel-input" (self-referencing),
      // which can't be resolved from the site build context, so alias to the ESM build.
      { find: /^intl-tel-input\/intlTelInputWithUtils$/, replacement: path.resolve(projectRoot, "../dist/js/intlTelInputWithUtils.mjs") },
      { find: /^intl-tel-input$/, replacement: path.resolve(projectRoot, "../dist/js/intlTelInput.mjs") },
    ],
  },
  define: {
    "process.env.VERSION": "window.IGNORE_ME", // just to stop runtime errors
    "process.env.NODE_ENV": "'production'", // required for vue files
  },
  build: {
    outDir: path.resolve(projectRoot, "dist/examples/js"),
    emptyOutDir: false,
    copyPublicDir: false,
    rollupOptions: {
      // stop vite/rollup from complaining about the dynamic import of utils.js
      external: (id) => id.startsWith("/intl-tel-input/js/utils.js"),
    },
    lib: {
      entry: path.resolve(projectRoot, "src/examples/js/svelte_main.js"),
      formats: ["cjs"],
      // Force .js extension — see comment in viteVueDemo.config.js.
      fileName: () => "svelte_component_bundle.js",
    },
  },
  plugins: [svelte()],
});
