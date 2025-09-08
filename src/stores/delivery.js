import { defineStore } from 'pinia'
import { request } from '@/utils/config';

export const useDeliveryStore = defineStore('delivery', {
    state: () => ({
        delivery: null,
    }),
    actions: {
        async getDelivery() {
            if (this.delivery) {
                return this.delivery;
            }
            const formData = new FormData();
            formData.append('type', 'query');
            let response = await request("/store/delivery", "POST", formData);
            response = await response.json();
            this.delivery = response.data;
            return this.delivery;
        }
    }
})
