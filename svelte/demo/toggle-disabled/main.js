import { mount } from "svelte";
import App from "./App.svelte";
import "../../../build/css/intlTelInput.css";
import "../../../build/css/demo.css";

mount(App, { target: document.getElementById("app") });
