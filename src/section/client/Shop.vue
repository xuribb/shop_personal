<template>
    <div class="shop">
        <div class="category_nav">
            <div>首页</div>
            <img src="/images/more.png">
            <div>家用电器</div>
            <img src="/images/more.png">
            <div>65H5 65英寸120Hz高刷护眼4k智能网络客厅液晶电视机家用 75</div>
        </div>
        <div class="shop_operate">
            <div class="shop_banner">
                <img src="/images/1719150266550352.jpg">
                <div>
                    <img class="img_active" src="/images/1719150266550352.jpg">
                    <img src="/images/1719150266550352.jpg">
                </div>
            </div>
            <div class="shop_secondary_info">
                <div>65H5 65英寸120Hz高刷护眼4k智能网络客厅液晶电视机家用 75</div>
                <div class="shop_price">
                    <div>
                        <div>售价</div>
                        <div>￥1000.00</div>
                    </div>
                    <div>销量：8</div>
                </div>
                <div class="shop_number">
                    <div>数量</div>
                    <div class="shop_number_ope">
                        <span>-</span>
                        <span>1</span>
                        <span>+</span>
                    </div>
                    <div>库存：100</div>
                </div>
                <div class="shop_shop">
                    <div>立即购买</div>
                    <div>加入购物车</div>
                </div>
            </div>
        </div>
        <div class="shop_info">
            <div @click="changeInfo">
                <div :class="{ 'info_active': this.tab == 'ShopInfo' }">详情</div>
                <div :class="{ 'info_active': this.tab == 'ShopComment' }">评价(0)</div>
            </div>
            <component :is="tab"></component>
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
            tab: 'ShopInfo'
        }
    },
    methods: {
        changeImg() {

        },
        changeInfo() {
            this.tab = this.tab == "ShopInfo" ? "ShopComment" : "ShopInfo";
        }
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