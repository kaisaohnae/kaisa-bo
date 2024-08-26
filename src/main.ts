import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from '@src/router/router';

import { globalCookiesConfig } from 'vue3-cookies';

import 'handsontable/dist/handsontable.full.min.css';
import '@src/assets/css/reset.css';
import '@src/assets/css/common.css';

const app = createApp(App);
const pinia = createPinia();

globalCookiesConfig({
  expireTimes: '30d',
  path: '/',
  domain: '',
  secure: true,
  sameSite: 'None',
});

// console.log(import.meta.env);
app.use(router);
app.use(pinia);
app.mount('#app');
