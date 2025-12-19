import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { version } from "../package.json";

export const getConfig = (filename) => defineConfig({
  root: "svelte",
  define: {
    "process.env.VERSION": `"${version}"`,
  },
  build: {
    outDir: "build",
    emptyOutDir: false,
    lib: {
      entry: `src/intl-tel-input/${filename}`,
      formats: ["es"],
      fileName: "[name]",
    },
    rollupOptions: {
      external: ["svelte", "svelte/internal"],
      output: {
        globals: {
          svelte: "Svelte",
        },
      },
    },
  },
  plugins: [svelte()],
});

export default getConfig("IntlTelInput.svelte");
