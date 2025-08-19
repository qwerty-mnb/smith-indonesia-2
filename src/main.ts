import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import ApiService from "./services/ApiService";

import router from "./router";
import i18n from "./i18n";

import "bootstrap";
import ElementPlus from "element-plus";
import "./assets/css/tailwind.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(i18n);
app.use(ElementPlus);


ApiService.init(app);

app.mount("#app");
