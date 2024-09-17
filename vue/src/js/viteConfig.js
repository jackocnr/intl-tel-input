import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { version } from "../../../package.json";

export const getConfig = (filename) => defineConfig({
  root: "vue/src/js",
  define: {
    "process.env.VERSION": `"${version}"`,
  },
  build: {
    outDir: "../../build/",
    emptyOutDir: false,
    lib: {
      entry: `./${filename}`,
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