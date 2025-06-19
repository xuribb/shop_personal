import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.config.globalProperties = {
    domain: "http://shop_personal_backend",
    async request(url, method = "GET", body = "") {
        try {
            let options = null;
            if (method !== "GET") {
                options = {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body)
                }
            }
            return await fetch(this.domain + url, options);
        } catch {
            ElMessage({
                message: '网络请求失败，请稍后重试',
                type: 'error',
                plain: true,
            });
            return null;
        }
    }
}

app.mount('#app')
