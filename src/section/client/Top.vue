<template>
    <div class="top">
        <div class="content">
            <div class="left">
                <span>欢迎你：游客&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span class="pointer">登录</span>
                <span>|</span>
                <span class="pointer">注册</span>
            </div>
            <div class="right">
                <span class="pointer">个人中心</span>
                <span>|</span>
                <span class="pointer">购物车</span>
                <span>|</span>
                <span class="pointer">消息</span>
                <span>|</span>
                <span class="pointer">退出</span>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
.top {
    background-color: var(--color-main-black);
    padding: 8px 0;
}

.content {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: var(--color-white);
    margin: 0 auto;
}

.left>span {
    margin-right: 8px;
}

.right>span {
    margin-left: 8px;
}

.pointer {
    cursor: pointer;
}
</style>