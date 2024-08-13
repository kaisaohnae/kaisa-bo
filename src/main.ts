import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from '@src/router/router';

import { globalCookiesConfig } from "vue3-cookies";

import "@src/assets/css/reset.css";
import "@src/assets/css/common.css";

import "@src/assets/css/tui-grid.css";
import "@src/assets/css/tui-grid-datepicker.css";
import "@src/assets/css/tui-grid-timepicker.css";
import "@src/assets/css/tui-grid-editor.css";

const app = createApp(App);
const pinia = createPinia();

globalCookiesConfig({
  expireTimes: "30d",
  path: "/",
  domain: "",
  secure: true,
  sameSite: "None",
});

// console.log(import.meta.env);
app.use(router);
app.use(pinia);
app.mount('#app');
