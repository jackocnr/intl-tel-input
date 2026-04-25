// needed for vue component demo page

import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const projectRoot = fileURLToPath(new URL("../../../..", import.meta.url));

export default defineConfig({
  define: {
    "process.env.VERSION": "window.IGNORE_ME", // just to stop runtime errors
    "process.env.NODE_ENV": "'production'", // required for vue files
    "process.env.IPAPI_TOKEN": JSON.stringify(process.env.IPAPI_TOKEN || ""),
  },
  build: {
    outDir: path.resolve(projectRoot, "dist/examples/js"),
    emptyOutDir: false,
    copyPublicDir: false,
    lib: {
      entry: path.resolve(projectRoot, "src/examples/vue-component/validation/main.ts"),
      formats: ["cjs"],
      // Force .js extension. Vite would otherwise use .cjs because the
      // package.json now has "type": "module" and a bare .js would be ESM.
      fileName: () => "vue_component_bundle.js",
    },
    rollupOptions: {
      external: [/utils\.js/],
    },
  },
  plugins: [vue()],
});
