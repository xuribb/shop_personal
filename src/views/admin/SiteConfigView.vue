<template>
    <div class="site_config">
        <el-menu router :default-active="$route.path" class="el-menu-custom" mode="horizontal">
            <el-menu-item index="/admin/site_config">基础配置</el-menu-item>
            <el-menu-item index="/admin/site_config/pass_edit">修改密码</el-menu-item>
            <el-menu-item index="/admin/site_config/other_config">其他</el-menu-item>
        </el-menu>
        <RouterView />
    </div>
</template>

<style scoped>
.site_config {
    background-color: #FFF;
    padding: 10px;
    box-shadow: 0 0 10px #CCC;
}

.el-menu-custom {
    height: 40px;
    margin-bottom: 20px;
}
</style>