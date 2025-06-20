<template>
    <div class="top">
        <div class="content">
            <div class="left">
                <span>欢迎你：{{ username }}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <template v-if="username === '游客'">
                    <RouterLink to="/login" class="pointer">登录</RouterLink>
                    <span>|</span>
                    <RouterLink to="/login?type=1" class="pointer">注册</RouterLink>
                </template>
            </div>
            <div class="right" v-if="username !== '游客'">
                <RouterLink to="/profile" class="pointer">个人中心</RouterLink>
                <span>|</span>
                <span class="pointer">购物车</span>
                <span>|</span>
                <span class="pointer">消息</span>
                <span>|</span>
                <span @click="quit" class="pointer">退出</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: ""
        }
    },
    methods: {
        async quit() {
            let response = await this.request("/user/quit");
            if (response === null) {
                return;
            }
            
            response = await response.json();
            ElMessage({
                message: response.msg,
                type: response.status ? 'success' : 'error',
                plain: true,
            });
            if (response.status) {
                sessionStorage.clear();
                location.reload();
            }
        }
    },
    mounted() {
        const username = sessionStorage.getItem("username");
        if (username) {
            this.username = username;
        } else {
            this.username = "游客";
        }
    }
}
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

.content a {
    color: var(--color-white);
}

.left>span:last-of-type {
    margin: 0 8px;
}

.right>span {
    margin-left: 8px;
}

.pointer {
    cursor: pointer;
}
</style>