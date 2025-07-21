import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import router from './router'

const app = createApp(App);
app.config.globalProperties = {
    domain: "/api",
    async request(url, method = "GET", body = "") {
        try {
            let options = null;
            if (method !== "GET") {
                options = { method, body };
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

app.use(createPinia());
app.use(ElementPlus, {
    locale: zhCn,
});
app.use(router);

app.mount('#app');
