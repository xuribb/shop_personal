<template>
    <div class="order">
        <div class="location">
            <div>地址信息</div>
            <div class="delivery_method">
                <div>送货方式：</div>
                <div class="delivery_method_wrap">
                    <div class="pointer" v-for="way in delivery" :key="way.id" @click="changeDelivery(way.way)"
                        :class="active_delivery == way.way ? 'active_delivery' : ''">{{ way.way }}</div>
                </div>
            </div>
            <div v-show="active_delivery != '无实体货物'">
                <div class="location_lists">
                    <div>地址列表：</div>
                    <div class="location_lists_wrap">
                        <div class="pointer" :class="item.isDefault ? 'active_delivery' : ''"
                            @click="changeAddress(index)" v-for="(item, index) in address" :key="item.id">
                            <div>{{ item.username }} {{ item.phone }}</div>
                            <div>{{ item.address1.join("") }} {{ item.address2 }}</div>
                        </div>
                    </div>
                </div>
                <div class="location_add pointer" @click="dialogVisible = true">添加地址</div>
            </div>
        </div>
        <div class="order_info">
            <div>订单信息</div>
            <div class="shop_info">
                <div>商品信息</div>
                <div class="shop_info_units">
                    <span>单价</span>
                    <span>数量</span>
                    <span>合计</span>
                </div>
            </div>
            <div class="shop_info" v-for="(shop, index) in goods" :key="shop.id">
                <div class="shop_item">
                    <img :src="shop.shop_img">
                    <div>{{ shop.shop_name }}</div>
                </div>
                <div class="shop_info_units">
                    <span>￥{{ shop.shop_price }}</span>
                    <span>{{ goods_nums[index] }}</span>
                    <span>￥{{ (shop.shop_price * goods_nums[index]).toFixed(2) }}</span>
                </div>
            </div>
            <div class="shop_total">
                <span>总价</span>
                <span>￥{{ total }}</span>
            </div>
        </div>
        <div class="pay_method">
            <div>支付方式</div>
            <div class="pay_method_wrap">
                <div class="pay_method_item pointer">
                    <img src="/images/alipay.png">
                    <div>支付宝</div>
                </div>
            </div>
            <div class="pay_note">
                <div>买家留言</div>
                <textarea placeholder="选填、建议填写和卖家达成一致的说明"></textarea>
            </div>
            <div class="pay_confirm">
                <div>
                    <span>实付款：</span>
                    <span>￥{{ total }}</span>
                </div>
                <div class="pointer">提交订单</div>
            </div>
        </div>

        <el-dialog v-model="dialogVisible" title="新增地址" width="500">
            <el-form>
                <el-form-item label="联系人" label-width="80px">
                    <el-input type="text" v-model.trim="username" />
                </el-form-item>
                <el-form-item label="联系电话" label-width="80px">
                    <el-input type="text" v-model.trim="phone" />
                </el-form-item>
                <el-form-item label="省市区" label-width="80px">
                    <el-cascader v-model="address1" :options="pca" :props="cascaderProps" />
                </el-form-item>
                <el-form-item label="详细地址" label-width="80px">
                    <el-input type="text" v-model.trim="address2" />
                </el-form-item>
                <el-form-item label="默认地址" label-width="80px">
                    <el-radio-group v-model="isDefault">
                        <el-radio :value="1">是</el-radio>
                        <el-radio :value="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="addAddress">确认</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useDeliveryStore } from '@/stores/delivery';
import { useAddressStore } from '@/stores/address';

import pca from "@/utils/pca-code.json";

export default {
    data() {
        return {
            delivery: [],
            active_delivery: null,
            address: [],
            dialogVisible: false,
            username: null,
            phone: null,
            address1: null,
            address2: null,
            isDefault: 0,
            pca: pca,
            cascaderProps: {
                value: "name",
                label: "name"
            },
            goods: [],
            goods_nums: [],
            total: 0
        }
    },
    methods: {
        ...mapActions(useDeliveryStore, ["getDelivery"]),
        ...mapActions(useAddressStore, ["getAddress", "clearAddress"]),
        changeDelivery(way) {
            this.active_delivery = way;
        },
        changeAddress(index) {
            this.address.forEach(i => i.isDefault = 0);
            this.address[index].isDefault = 1;
        },
        async addAddress() {
            this.dialogVisible = false;

            const formData = new FormData();
            formData.append('type', 'save');
            formData.append('username', this.username);
            formData.append('phone', this.phone);
            formData.append('address1', JSON.stringify(this.address1));
            formData.append('address2', this.address2);
            formData.append('isDefault', this.isDefault);
            await this.request("/user/location", "POST", formData);
            this.clearAddress();
            this.address = await this.getAddress();
        },
        async getGoods(ids) {
            const formData = new FormData();
            formData.append('type', 'query');
            formData.append('ids', ids);
            let response = await this.request("/shop/list", "POST", formData);
            response = await response.json();
            this.goods = response.data;
            for (const key in this.goods) {
                this.total += this.goods[key].shop_price * this.goods_nums[key];
            }
            this.total = this.total.toFixed(2);
        }
    },
    async mounted() {
        if(!sessionStorage.getItem("username")){
            this.$router.push("/login");
        }
        // 获取交付方式
        this.delivery = await this.getDelivery();
        this.active_delivery = this.delivery[0].way;
        // 获取用户地址
        this.address = await this.getAddress();
        if (!this.address) {
            return this.$router.push("/login");
        }
        // 获取商品信息
        const search = new URLSearchParams(location.search);
        const goods_ids = search.get("goods_ids")?.split(",");
        this.goods_nums = search.get("goods_nums")?.split(",");
        this.getGoods(goods_ids);
    },

}
</script>

<style scoped>
.location {
    background-color: var(--color-white);
    margin: 20px 0;
    padding: 15px 20px;
}

.location>div:first-child {
    padding-bottom: 10px;
    font-size: 18px;
    border-bottom: 1px dashed var(--color-secondary-black);
}

.delivery_method {
    display: flex;
    align-items: center;
    margin: 10px 0;
}

.delivery_method_wrap {
    display: flex;
}

.delivery_method_wrap>div {
    background-color: #FFF;
    padding: 5px 10px;
    border-radius: 5px;
    margin: 0 10px;
    font-size: 14px;
    box-sizing: border-box;
}

.active_delivery {
    border: 1px solid var(--color-secondary-black);
    background-image: url("/images/selected.png");
    background-repeat: no-repeat;
    background-position: right bottom;
    background-size: 16px;
}

.location_lists {
    display: flex;
    margin-top: 20px;
}

.location_lists_wrap>div {
    background-color: #FFF;
    padding: 5px 10px;
    border-radius: 5px;
    margin: 0 10px 8px;
    font-size: 14px;
    box-sizing: border-box;
}

.location_add {
    display: inline-block;
    background-color: var(--color-main-black);
    color: var(--color-white);
    padding: 6px 15px;
    border-radius: 5px;
    margin-top: 20px;
}
</style>

<style scoped>
.order {
    width: 1200px;
    margin: 20px auto;
}

.order_info {
    background-color: var(--color-white);
    margin: 20px 0;
    padding: 15px 20px;
}

.order_info>div:first-child {
    padding-bottom: 10px;
    font-size: 18px;
    border-bottom: 1px dashed var(--color-secondary-black);
}

.shop_info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0 8px;
}

.shop_info_units {
    display: flex;
    align-items: center;
    text-align: end;
}

.shop_info_units>span {
    width: 100px;
}

.shop_item {
    display: flex;
}

.shop_item>img {
    width: 80px;
    margin-right: 20px;
}

.shop_total {
    display: flex;
    align-items: baseline;
    justify-content: end;
    margin-top: 30px;
}

.shop_total>span:last-child {
    font-size: 26px;
    font-weight: bold;
    color: red;
    margin-left: 10px;
}
</style>

<style scoped>
.pay_method {
    background-color: var(--color-white);
    margin: 20px 0;
    padding: 15px 20px;
}

.pay_method>div:first-child {
    padding-bottom: 10px;
    font-size: 18px;
    border-bottom: 1px dashed var(--color-secondary-black);
}

.pay_method_wrap {
    display: flex;
    margin: 20px 0;
}

.pay_method_item {
    display: flex;
    align-items: center;
    background-color: #FFF;
    padding: 10px 40px;
    border-radius: 5px;
    border: 1px solid var(--color-main-black);
    background-image: url("/images/selected.png");
    background-repeat: no-repeat;
    background-position: right bottom;
    background-size: 16px;
}

.pay_method_item>img {
    width: 20px;
    margin-right: 10px;
}

.pay_note>div {
    margin-top: 30px;
}

.pay_note textarea {
    box-sizing: border-box;
    width: 100%;
    height: 80px;
    resize: none;
    margin-top: 10px;
    padding: 10px;
    font-size: 18px;
}

.pay_confirm {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 50px;
}

.pay_confirm>div:first-child {
    display: flex;
    align-items: baseline;
}

.pay_confirm>div:first-child>span:last-child {
    color: red;
    font-weight: bold;
    font-size: 26px;
}

.pay_confirm>div:last-child {
    background-color: var(--color-main-black);
    color: var(--color-white);
    padding: 8px 15px;
    border-radius: 5px;
}
</style>