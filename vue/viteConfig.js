import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export const getConfig = (filename) => defineConfig({
  root: "vue",
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