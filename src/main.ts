import './assets/main.sass'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router.ts'
import moviesStore from '@stores/moviesStore.ts'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(moviesStore)

app.mount('#app')
