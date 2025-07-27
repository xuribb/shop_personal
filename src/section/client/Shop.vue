<template>
    <div class="shop">
        <div class="category_nav">
            <div>首页</div>
            <img src="/images/more.png">
            <div>{{ $route.params.category_name }}</div>
            <img src="/images/more.png">
            <div>{{ shop.shop_name }}</div>
        </div>
        <div class="shop_operate">
            <div class="shop_banner">
                <img :src="shop.shop_img">
                <div>
                    <img class="img_active" src="/images/1719150266550352.jpg">
                    <img src="/images/1719150266550352.jpg">
                </div>
            </div>
            <div class="shop_secondary_info">
                <div>{{ shop.shop_name }}</div>
                <div class="shop_price">
                    <div>
                        <div>售价</div>
                        <div>￥{{ shop.shop_price }}</div>
                    </div>
                    <div>销量：{{ shop.sales }}</div>
                </div>
                <div class="shop_number">
                    <div>数量</div>
                    <div class="shop_number_ope">
                        <span>-</span>
                        <span>1</span>
                        <span>+</span>
                    </div>
                    <div>库存：{{ shop.inventory }}</div>
                </div>
                <div class="shop_shop">
                    <div class="pointer">立即购买</div>
                    <div class="pointer" @click="addShopCart">加入购物车</div>
                </div>
            </div>
        </div>
        <div class="shop_info">
            <div @click="changeInfo">
                <div :class="{ 'info_active': this.tab == 'ShopInfo' }">详情</div>
                <div :class="{ 'info_active': this.tab == 'ShopComment' }">评价(0)</div>
            </div>
            <component :is="tab">{{ shop.shop_desc }}</component>
        </div>
    </div>
</template>

<script>
import ShopInfo from "@/section/client/ShopInfo.vue";
import ShopComment from "@/section/client/ShopComment.vue";

export default {
    components: {
        ShopInfo,
        ShopComment
    },
    data() {
        return {
            shop: [],
            tab: 'ShopInfo'
        }
    },
    methods: {
        async addShopCart() {
            const formData = new FormData();
            formData.append('type', 'save');
            formData.append('shop_id', this.$route.params.shop_id);
            let response = await this.request("/user/shopcart", "POST", formData);
            if (response === null) {
                return;
            }

            response = await response.json();
            ElMessage({
                message: response.msg,
                type: response.status ? 'success' : 'error',
                plain: true,
            });
        },
        changeImg() {

        },
        changeInfo() {
            this.tab = this.tab == "ShopInfo" ? "ShopComment" : "ShopInfo";
        },
        async getShop() {
            const formData = new FormData();
            formData.append('type', 'query');
            formData.append('id', this.$route.params.shop_id);
            formData.append('page_num', 1);
            formData.append('page_size', 1);
            let response = await this.request("/shop/list", "POST", formData);
            if (response === null) {
                return;
            }

            response = await response.json();
            if (response.status) {
                this.shop = response.data[0];
            }
        }
    },
    mounted() {
        this.getShop();
    }
}
</script>

<style scoped>
.shop {
    width: 1200px;
    margin: 18px auto 50px;
}

.category_nav {
    display: flex;
    align-items: center;
}

.category_nav>img {
    width: 13px;
    margin: 0 10px;
}

.shop_operate {
    display: flex;
    margin: 15px 0;
    padding: 15px;
    background-color: var(--color-white);
}

.shop_banner {
    width: 400px;
}

.shop_banner>img {
    width: 100%;
    height: 400px;
}

.shop_banner>div>img {
    width: 60px;
    box-sizing: border-box;
    margin-right: 8px;
}

.img_active {
    border: 1px solid var(--color-main-black);
    padding: 2px;
    border-radius: 2px;
}

.shop_secondary_info {
    margin-left: 20px;
    flex-grow: 1;
}

.shop_secondary_info>div:first-child {
    font-weight: bold;
    font-size: 20px;
}

.shop_price {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    background-color: #FFF;
    padding: 15px 20px;
    margin: 10px 0;
}

.shop_price>div:first-child {
    display: flex;
    align-items: baseline;
}

.shop_price>div:first-child>div:last-child {
    font-size: 22px;
    font-weight: bold;
    color: red;
    margin-left: 8px;
}

.shop_price>div:last-child {
    font-size: 14px;
    color: var(--color-secondary-black);
}

.shop_number {
    display: flex;
    align-items: baseline;
    margin: 20px 0;
}

.shop_number_ope {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 20px;
    font-size: 18px;
}

.shop_number_ope>span {
    margin: 0 2px;
    padding: 0 15px;
    font-size: 20px;
    color: var(--color-white);
    background-color: var(--color-blue-green);
    border-radius: 3px;
}

.shop_number_ope>span:nth-child(2) {
    padding: 0 20px;
}

.shop_number>div:last-child {
    font-size: 14px;
    color: var(--color-secondary-black);
}

.shop_shop {
    display: flex;
    align-items: center;
    margin-top: 30px;
}

.shop_shop>div:first-child {
    background-color: var(--color-main-black);
    color: var(--color-white);
    padding: 8px 20px;
    margin-right: 20px;
}

.shop_shop>div:last-child {
    background-color: var(--color-blue-green);
    color: var(--color-white);
    padding: 8px 20px;
}
</style>

<style scoped>
.shop_info>div:first-child {
    display: flex;
    margin-top: 30px;
    border: 1px solid var(--color-main-black);
}

.shop_info>div>div {
    text-align: center;
    flex-grow: 1;
    padding: 8px 0;
}

.info_active {
    background-color: var(--color-main-black);
    color: var(--color-white);
}
</style>