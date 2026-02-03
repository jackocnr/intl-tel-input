// needed for vue component demo page

import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const projectRoot = fileURLToPath(new URL("../../..", import.meta.url));

export default defineConfig({
  define: {
    "process.env.VERSION": "window.IGNORE_ME", // just to stop runtime errors
    "process.env.NODE_ENV": "'production'", // required for vue files
  },
  build: {
    outDir: path.resolve(projectRoot, "build/examples/js"),
    emptyOutDir: false,
    copyPublicDir: false,
    lib: {
      entry: path.resolve(projectRoot, "src/examples/js/vue_main.js"),
      formats: ["cjs"],
      fileName: "vue_component_bundle",
    },
    rollupOptions: {
      external: [/utils\.js/],
    },
  },
  plugins: [vue()],
});
