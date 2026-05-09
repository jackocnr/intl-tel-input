import { mount } from "svelte";
import App from "./App.svelte";
import "../../../../demo/src/theme.js";
import "../../../../demo/dist/demo.css";

mount(App, { target: document.getElementById("app") });
