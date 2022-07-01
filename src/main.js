import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from "element-plus/lib/locale/lang/zh-cn"
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'


window.jQuery = $
window.$ = $

const app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus, {locale})
app.mount('#app')

// createApp(App).use(store).use(router).mount('#app')
