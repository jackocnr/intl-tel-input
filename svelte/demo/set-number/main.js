import { mount } from "svelte";
import App from "./App.svelte";
import "../../../dist/css/intlTelInput.css";
import "../../../dist/css/demo.css";

mount(App, { target: document.getElementById("app") });
