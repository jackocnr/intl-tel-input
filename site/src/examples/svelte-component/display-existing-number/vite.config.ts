import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

const projectRoot = fileURLToPath(new URL("../../../..", import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      { find: /^intl-tel-input\/intlTelInputWithUtils$/, replacement: path.resolve(projectRoot, "../packages/core/dist/js/intlTelInputWithUtils.mjs") },
      { find: /^intl-tel-input$/, replacement: path.resolve(projectRoot, "../packages/core/dist/js/intlTelInput.mjs") },
    ],
  },
  define: {
    "process.env.VERSION": "window.IGNORE_ME",
    "process.env.NODE_ENV": "'production'",
  },
  build: {
    outDir: path.resolve(projectRoot, "dist/examples/js"),
    emptyOutDir: false,
    copyPublicDir: false,
    rollupOptions: {
      external: (id) => id.startsWith("/intl-tel-input/js/utils.js"),
    },
    lib: {
      entry: path.resolve(projectRoot, "src/examples/svelte-component/display-existing-number/main.ts"),
      formats: ["cjs"],
      fileName: () => "svelte_display_existing_number_bundle.js",
    },
  },
  plugins: [svelte()],
});
