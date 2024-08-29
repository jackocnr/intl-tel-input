import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { version } from "../package.json";

export const getConfig = (filename) => defineConfig({
  root: "vue",
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
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [vue()],
});

export default getConfig("IntlTelInput.vue");