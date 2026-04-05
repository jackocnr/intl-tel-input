import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { version } from "../package.json";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export const getConfig = (filename) => defineConfig({
  root: "svelte",
  define: {
    "process.env.VERSION": `"${version}"`,
  },
  resolve: {
    alias: {
      "intl-tel-input/intlTelInputWithUtils": resolve(__dirname, "../src/js/intl-tel-input/intlTelInputWithUtils.ts"),
      "intl-tel-input": resolve(__dirname, "../src/js/intl-tel-input.ts"),
    },
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
