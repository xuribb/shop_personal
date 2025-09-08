import { defineStore } from 'pinia'
import { request } from '@/utils/config';

export const useAddressStore = defineStore('address', {
    state: () => ({
        address: null,
    }),
    actions: {
        async getAddress() {
            if (this.address) {
                return this.address;
            }
            const formData = new FormData();
            formData.append('type', 'query');
            let response = await request("/user/location", "POST", formData);
            response = await response.json();
            response.data.forEach(item => {
                item.address1 = JSON.parse(JSON.parse(item.address1));
            });
            this.address = response.data;
            return this.address;
        },
        clearAddress() {
            this.address = null;
        }
    }
})
