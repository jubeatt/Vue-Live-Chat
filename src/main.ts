import { ComponentPublicInstance, createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/style/index.scss'
import { auth } from './firebase/config'

let app: ComponentPublicInstance

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(router).mount('#app')
  }
})
