import { mount } from "svelte";
import App from "./App.svelte";
import "../../../demo/dist/demo.css";

mount(App, { target: document.getElementById("app") });
