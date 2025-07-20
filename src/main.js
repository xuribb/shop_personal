import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import router from './router'

import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';


const app = createApp(App);

app.component(VueCropper);
app.config.globalProperties = {
    domain: "/api",
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

app.use(createPinia());
app.use(ElementPlus, {
    locale: zhCn,
});
app.use(router);

app.mount('#app');
