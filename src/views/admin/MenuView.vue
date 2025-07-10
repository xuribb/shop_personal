<template>
    <div class="menu_page">
        <el-menu router :default-active="$route.path" background-color="#222831" text-color="#aaa" active-text-color="#fff"
            class="el-menu_custom" @open="handleOpen" @close="handleClose">
            <el-menu-item index="/admin">
                <span>统计面板</span>
            </el-menu-item>
            <el-sub-menu index="用户管理">
                <template #title>用户管理</template>
                <el-menu-item index="/admin/user_list">用户列表</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="商品管理">
                <template #title>商品管理</template>
                <el-menu-item index="/admin/shop_category">商品分类</el-menu-item>
                <el-menu-item index="/admin/shop_list">商品列表</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="订单管理">
                <template #title>订单管理</template>
                <el-menu-item index="/admin/order_list">订单列表</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="支付管理">
                <template #title>支付管理</template>
                <el-menu-item index="/admin/pay_list">支付配置</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="系统管理">
                <template #title>系统管理</template>
                <el-menu-item index="/admin/site_config">网站配置</el-menu-item>
            </el-sub-menu>
        </el-menu>
        <div class="content">
            <div class="status_bar">
                <el-button size="small" text type="danger">退出</el-button>
            </div>
            <RouterView />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: "admin"
        }
    }
}
</script>

<style scoped>
.menu_page {
    display: flex;
    background-color: var(--color-white);
}

.el-menu_custom {
    flex-basis: 160px;
    height: 100vh;
    border-right: 0;
}

.content {
    flex-grow: 1;
    margin: 10px;
}

.status_bar {
    background-color: #FFF;
    margin-bottom: 10px;
    box-shadow: 0 0 10px #CCC;
}
</style>