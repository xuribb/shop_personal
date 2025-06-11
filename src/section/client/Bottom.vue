<template>
    <div class="bottom">
        <div class="content">
            <div class="section">
                <div class="section_header">帮助中心</div>
                <div class="pointer">支付方式</div>
                <div class="pointer">订单查询</div>
                <div class="pointer">发票制度</div>
            </div>
            <div class="section">
                <div class="section_header">配送方式</div>
                <div class="pointer">验货与签收</div>
                <div class="pointer">配送时间及运费</div>
                <div class="pointer">物流政策</div>
            </div>
            <div class="section">
                <div class="section_header">售后服务</div>
                <div class="pointer">取消订单</div>
                <div class="pointer">退货政策</div>
                <div class="pointer">退货说明</div>
            </div>
            <div class="section">
                <div class="section_header">客服中心</div>
                <div class="pointer">购物流程</div>
                <div class="pointer">常见问题</div>
                <div class="pointer">服务协议</div>
            </div>
            <div class="section company_info">
                <div class="section_header">公司信息</div>
                <div class="pointer">
                    <img src="/images/dianhua.png">
                    <span>19874296340</span>
                </div>
                <div class="pointer">
                    <img src="/images/dizhiguanli.png">
                    <span>四川省成都市锦江区走马街32号3栋1单元10层1019号</span>
                </div>
                <div class="pointer">
                    <img src="/images/gongsi.png">
                    <span>成都宏盛呈运科技有限公司</span>
                </div>
            </div>
        </div>
        <div class="copyright">
            <div>版权所有：云购未来商务有限公司</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div>ICP备案：<a href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备2024110969号-1</a></div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
.bottom {
    background-color: var(--color-main-black);
    padding: 20px 0;
}

.content {
    width: 1200px;
    display: flex;
    color: var(--color-white);
    margin: 0 auto;
}

.section {
    width: 200px;
    margin-right: 20px;
}

.section_header {
    font-size: 20px;
    font-weight: bold;
}

.company_info {
    font-size: 12px;
    width: auto;
    margin-right: 0;
}

.company_info img {
    width: 14px;
    margin-right: 5px;
}

.company_info .pointer {
    display: flex;
    align-items: center;
    cursor: text;
}

.pointer {
    cursor: pointer;
    margin-top: 10px;
}

.copyright {
    display: flex;
    justify-content: center;
    color: var(--color-white);
    font-size: 12px;
    margin-top: 30px;
}

.copyright a {
    color: var(--color-white);
}
</style>