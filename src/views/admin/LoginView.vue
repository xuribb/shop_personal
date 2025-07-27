<template>
    <div class="login" style="background-image: url('/images/logoasdsafd.png');">
        <div class="login_wrap">
            <el-input class="input" v-model.trim="username" placeholder="用户名" />
            <el-input class="input" type="password" show-password v-model.trim="password" placeholder="密码" />
            <div class="captcha">
                <el-input v-model.trim="captcha" placeholder="验证码" />
                <img class="pointer" @click="refreshCaptcha" :src="captcha_src">
            </div>
            <el-button class="login_btn" type="primary" @click="login">登录</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            captcha_src: "/api/common/captcha",
            username: "",
            password: "",
            captcha: ""
        }
    },
    methods: {
        refreshCaptcha() {
            this.captcha_src = `/api/common/captcha?t=${Date.now()}`;
        },
        async login() {
            if (!this.username) {
                return ElMessage({
                    message: '用户名错误！',
                    type: 'error',
                    plain: true,
                });
            }
            if (!this.password) {
                return ElMessage({
                    message: '密码错误！',
                    type: 'error',
                    plain: true,
                });
            }
            if (!this.captcha) {
                return ElMessage({
                    message: '验证码错误！',
                    type: 'error',
                    plain: true,
                });
            }

            const formData = new FormData();
            formData.append('username', this.username);
            formData.append('password', this.password);
            formData.append('captcha', this.captcha);
            let response = await this.request("/user/login", "POST", formData);
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
                sessionStorage.setItem("username", this.username);
                this.$router.replace("/admin");
            }
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

.captcha {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
}

.captcha>img {
    margin-left: 10px;
}

.login_btn {
    width: 100%;
}
</style>