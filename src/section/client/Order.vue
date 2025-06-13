<template>
    <div class="order">
        <div class="location">
            <div>地址信息</div>
            <div class="delivery_method">
                <div>送货方式：</div>
                <div class="delivery_method_wrap">
                    <div class="active_delivery pointer">快递邮寄</div>
                    <div class="pointer">上门自取</div>
                    <div class="pointer">免送货</div>
                </div>
            </div>
            <div class="location_lists">
                <div>地址列表：</div>
                <div class="location_lists_wrap">
                    <div class="active_delivery pointer">河南省</div>
                    <div class="pointer">广东省</div>
                    <div class="pointer">广西省</div>
                </div>
            </div>
            <div class="location_add pointer">添加地址</div>
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
            <div class="shop_info">
                <div class="shop_item">
                    <img src="/images/1719148658418921.jpg">
                    <div>燃气热水器家用12升恒温天然气液化气煤气强排式平衡式零冷水</div>
                </div>
                <div class="shop_info_units">
                    <span>￥599.00</span>
                    <span>1</span>
                    <span>￥599.00</span>
                </div>
            </div>
            <div class="shop_total">
                <span>总价</span>
                <span>￥599.00</span>
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
                    <span>￥549.00</span>
                </div>
                <div class="pointer">提交订单</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
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