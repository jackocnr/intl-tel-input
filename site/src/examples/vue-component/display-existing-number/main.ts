import { createApp } from "vue";
// @ts-expect-error - .vue file resolved by vite at build time
import App from "../../../../tmp/examples/vue-component/display-existing-number/component.vue";

createApp(App).mount("#app");
