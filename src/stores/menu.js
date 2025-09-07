import { defineStore } from 'pinia'
import { request } from '@/utils/config';

export const useMenuStore = defineStore('menu', {
    state: () => ({
        menu: null,
    }),
    actions: {
        async getMenu() {
            if (this.menu) {
                return this.menu;
            }

            const formData = new FormData();
            formData.append('type', 'query');
            try {
                let response = await request("/shop/category", "POST", formData);
                response = await response.json();
                this.menu = response.data;
                return this.menu;
            } catch (error) {
                this.menu = null;
                //ElMessage 全局组件
                ElMessage({
                    message: '网络请求失败，请稍后重试',
                    type: 'error',
                    plain: true,
                });
            }
        }
    }
})
