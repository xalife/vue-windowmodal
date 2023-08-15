import { createApp } from 'vue'
import App from './App.vue'

import WindowModal from 'vuewindowmodal';
import 'vuewindowmodal/dist/vuewindowmodal.css';
console.log(WindowModal);
const app = createApp(App);

app.mount('#app')
