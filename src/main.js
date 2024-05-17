import { createApp } from 'vue'
import './assets/styles/_main.scss'
import App from './App.vue'
import { createPinia } from "pinia"
import router from './routes'

const app = createApp(App);

app.use(createPinia());
app.use(router)

app.mount("#app");

export default app;