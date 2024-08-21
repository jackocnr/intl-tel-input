import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  root: "vue",
  build: {
    outDir: "build",
    lib: {
      entry: [
        "src/intl-tel-input/IntlTelInput.vue",
        "src/intl-tel-input/IntlTelInputWithUtils.vue",
      ],
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