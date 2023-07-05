import { ViteSSG } from "vite-ssg";
import "./style.css";
import "virtual:uno.css";
import App from "./App.vue";
import { routes } from "./router";

export const createApp = ViteSSG(App, { routes });
