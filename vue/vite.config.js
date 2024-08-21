import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  root: "vue",
  build: {
    outDir: "build",
    lib: {
      entry: resolve(__dirname, "src/intl-tel-input/IntlTelInputWithUtils.vue"),
      name: "IntlTelInput",
      fileName: "IntlTelInputWithUtils",
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