import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { version } from "../../../package.json";

export default defineConfig({
  root: "svelte/demo/simple",
  define: {
    "process.env.VERSION": `"${version}"`,
  },
  plugins: [svelte()],
});
