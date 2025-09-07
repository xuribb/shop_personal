<template>
    <div class="home">
        <Carousel :slides="slides" :interval="3000" />
        <div class="shop_category">
            <div class="category_header">
                <div>家用电器</div>
                <div>
                    <div>更多</div>
                    <img src="/images/more.png">
                </div>
            </div>
            <div class="category_content">
                <img class="shop_item" src="/images/1741484720279171.jpg">
                <div class="shop_item">
                    <img src="/images/1719148658418921.jpg">
                    <div>
                        <div class="shop_price">
                            <div>￥549.00</div>
                            <div>销售：0</div>
                        </div>
                        <div class="shop_info">燃气热水器家用12升恒温天然气液化气煤气强排式平衡式零冷水气强排式平衡式零冷水</div>
                    </div>
                </div>
                <div class="shop_item">
                    <img src="/images/1719148658418921.jpg">
                    <div>
                        <div class="shop_price">
                            <div>￥549.00</div>
                            <div>销售：0</div>
                        </div>
                        <div class="shop_info">燃气热水器家用12升恒温天然气液化气煤气强排式平衡式零冷水气强排式平衡式零冷水</div>
                    </div>
                </div>
                <div class="shop_item">
                    <img src="/images/1719148658418921.jpg">
                    <div>
                        <div class="shop_price">
                            <div>￥549.00</div>
                            <div>销售：0</div>
                        </div>
                        <div class="shop_info">燃气热水器家用12升恒温天然气液化气煤气强排式平衡式零冷水气强排式平衡式零冷水</div>
                    </div>
                </div>
                <div class="shop_item">
                    <img src="/images/1719148658418921.jpg">
                    <div>
                        <div class="shop_price">
                            <div>￥549.00</div>
                            <div>销售：0</div>
                        </div>
                        <div class="shop_info">燃气热水器家用12升恒温天然气液化气煤气强排式平衡式零冷水气强排式平衡式零冷水</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useMenuStore } from '@/stores/menu';

import Carousel from "@/section/client/Carousel.vue";

export default {
    components: {
        Carousel
    },
    data() {
        return {
            slides: [
                { image: '/images/1741484466657702.jpg', alt: 'Image 1' },
                { image: '/images/1741484523211763.jpg', alt: 'Image 2' }
            ]
        }
    },
    methods: {
        ...mapActions(useMenuStore, ['getMenu'])
    }
}
</script>

<style scoped>
.shop_category {
    width: 1200px;
    margin: 40px auto 50px;
}

.category_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.category_header>div:first-child {
    border-left: 5px solid var(--color-main-black);
    padding-left: 10px;
}

.category_header>div:last-child {
    display: flex;
    align-items: center;
}

.category_header>div:last-child>img {
    width: 16px;
    height: 16px;
}

.category_content {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.shop_item {
    width: 220px;
    height: 300px;
    overflow: hidden;
}

.shop_item img {
    width: 100%;
}

.shop_price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 4px 0;
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
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>