<template>
    <div class="category">
        <div class="shop_category">
            <div class="category_header">
                <div class="category_nav">
                    <div>首页</div>
                    <img src="/images/more.png">
                    <div>家用电器</div>
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
        <div class="page_clip">
            <div>第 1 页</div>
            <img src="/images/more_white.png">
            <img src="/images/more_white.png">
        </div>
    </div>
</template>

<script>

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
    justify-content: space-between;
    margin-top: 10px;
}

.shop_item {
    width: 220px;
    height: 300px;
    overflow: hidden;
}

.shop_item>img {
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