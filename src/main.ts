import App from "./App.vue";
import { router } from "./router";
import "./style.css";
import "virtual:uno.css";

createApp(App).use(router).mount("#app");
