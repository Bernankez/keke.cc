import { ViteSSG } from "vite-ssg";
import "./style.css";
import "uno.css";
import App from "./App.vue";
import { routes } from "./router";

export const createApp = ViteSSG(App, { routes });
