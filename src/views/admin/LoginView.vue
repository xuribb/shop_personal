<template>
    <div class="login" style="background-image: url('/images/logoasdsafd.png');">
        <div class="login_wrap">
            <el-input class="input" v-model="username" placeholder="用户名" />
            <el-input class="input" v-model="password" placeholder="密码" />
            <el-button class="login_btn" type="primary" @click="login">登录</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        login() {
            // fetch("")
        }
    }
}
</script>

<style scoped>
.login {
    width: 100vw;
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
}

.login_wrap {
    float: right;
    width: 300px;
    margin: 200px 15% 0 0;
    padding: 20px;
    background-color: #FFF;
    box-shadow: 0 0 10px #CCC;
    border-radius: 3px;
}

.input {
    margin-bottom: 16px;
}

.login_btn {
    width: 100%;
}
</style>