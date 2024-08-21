import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  root: "vue/demo/validation",
  define: {
    "process.env.VERSION": "window.TEST", // stop complaining about process.env.VERSION
  },
  plugins: [vue()],
});