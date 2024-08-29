import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { version } from "../../../package.json";

export default defineConfig({
  root: "vue/demo/validation",
  define: {
    "process.env.VERSION": `"${version}"`,
  },
  plugins: [vue()],
});