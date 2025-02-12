import {createApp} from 'vue';
import {createPinia} from 'pinia';
import App from '@/app.vue';
import router from '@/router/router';
import {globalCookiesConfig} from 'vue3-cookies';

import 'handsontable/dist/handsontable.full.min.css';
import '@/assets/css/reset.css';
import '@/assets/css/common.css';

import '@/assets/css/lib/tui-grid-editor.css';

const app = createApp(App);
const pinia = createPinia();

globalCookiesConfig({
  expireTimes: '30d',
  path: '/',
  domain: '',
  secure: true,
  sameSite: 'None',
});

const textareas = document.querySelectorAll('textarea');
textareas.forEach(textarea => {
  textarea.removeAttribute('aria-hidden');
});

app.use(router);
app.use(pinia);
app.mount('#app');
