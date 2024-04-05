import { createApp } from 'vue'
import App from '@/App.vue'
import eventBus from "@/js/eventBus.js";

const app = createApp(App)
app.config.globalProperties.$bus = eventBus;

app.mount('#app');
