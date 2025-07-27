<template>
    <div class="category">
        <div class="shop_category">
            <div class="category_header">
                <div class="category_nav">
                    <div>首页</div>
                    <img src="/images/more.png">
                    <div>{{ $route.params.category_name }}</div>
                </div>
                <div class="category_order">
                    <div class="pointer">综合</div>
                    <div class="category_order_item pointer">
                        <div>销量</div>
                        <img src="/images/order.png">
                    </div>
                    <div class="category_order_item pointer">
                        <div>价格</div>
                        <img src="/images/order.png">
                    </div>
                    <div class="category_order_item pointer">
                        <div>最新</div>
                        <img src="/images/order.png">
                    </div>
                </div>
            </div>
            <div class="category_content">
                <div class="shop_item pointer" v-for="shop of shop_list" :key="shop.id" :data-id="shop.id" @click="toShop">
                    <img :src="shop.shop_img">
                    <div class="shop_info_wrap">
                        <div class="shop_price">
                            <div>￥{{ shop.shop_price }}</div>
                            <div>销售：{{ shop.sales }}</div>
                        </div>
                        <div class="shop_info">{{ shop.shop_name }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page_clip">
            <div>第 1 页</div>
            <img src="/images/more_white.png">
            <img src="/images/more_white.png">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            shop_list: [],
        }
    },
    methods: {
        toShop(e){
            const id = e.currentTarget.dataset.id;
            this.$router.push(`/shop/${this.$route.params.category_id}/${this.$route.params.category_name}/${id}`);
        },
        async getShopList(page_num) {
            const formData = new FormData();
            formData.append('type', 'query');
            formData.append('category_id', this.$route.params.category_id);
            formData.append('page_num', page_num);
            formData.append('page_size', 10);
            let response = await this.request("/shop/list", "POST", formData);
            if (response === null) {
                return;
            }

            response = await response.json();
            if (response.status) {
                this.shop_list = response.data;
            }
        }
    },
    watch: {
        '$route.params.category_id'(newValue, oldValue) {
            this.getShopList(1);
        }
    },
    created() {
        this.getShopList(1);
    }
}
</script>

<style scoped>
.shop_category {
    width: 1200px;
    margin: 18px auto 50px;
}

.category_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.category_nav {
    display: flex;
    align-items: center;
}

.category_nav>img {
    width: 13px;
    margin: 0 10px;
}

.category_order {
    display: flex;
    align-items: center;
}

.category_order>div {
    display: flex;
    align-items: center;
    margin-left: 16px;
}

.category_order_item>img {
    width: 13px;
    margin-left: 1px;
}

.category_content {
    display: flex;
    flex-wrap: wrap;
}

.shop_item {
    width: 220px;
    height: 300px;
    display: flex;
    flex-direction: column;
    margin: 10px;
    overflow: hidden;
}

.shop_item>img {
    width: 100%;
    height: auto;
    overflow: hidden;
}

.shop_info_wrap {
    background-color: var(--color-white);
    padding: 4px;
}

.shop_price {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.shop_price>div:first-child {
    color: var(--color-blue-green);
    font-weight: bold;
    font-size: 18px;
}

.shop_price>div:last-child {
    color: var(--color-secondary-black);
    font-size: 12px;
}

.shop_info {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.page_clip {
    width: 1200px;
    margin: 40px auto;
    display: flex;
    align-items: center;
    justify-content: end;
}

.page_clip>img {
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    padding: 6px 10px;
    background-color: var(--color-main-black);
    margin-left: 15px;
    border-radius: 5px;
}

.page_clip>img:first-of-type {
    transform: rotate(180deg);
}
</style>