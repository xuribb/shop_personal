<template>
    <div class="login">
        <div class="login_info">
            <img src="/images/logo.png">
            <div>会员登录</div>
        </div>
        <div class="login_content">
            <div class="login_section">
                <div></div>
                <div class="login_wrap" v-if="is_login">
                    <input v-model.trim="username" class="login_input" placeholder="用户名" type="text">
                    <input v-model.trim="password" class="login_input" placeholder="密码" type="password">
                    <div class="captcha_wrap">
                        <input v-model.trim="captcha" class="login_input" placeholder="验证码" type="text">
                        <img class="pointer" @click="refreshCaptcha" :src="captcha_src">
                    </div>
                    <div class="login_btn pointer" @click="login">登录</div>
                    <div class="login_other">
                        <div class="pointer" @click="is_login = !is_login">立即注册</div>
                        <div class="pointer">忘记密码?</div>
                    </div>
                </div>
                <div class="register_wrap" v-else>
                    <input v-model.trim="username" class="login_input" placeholder="用户名" type="text">
                    <input v-model.trim="password" class="login_input" placeholder="密码" type="password">
                    <input v-model.trim="password2" class="login_input" placeholder="确认密码" type="password">
                    <div class="captcha_wrap">
                        <input v-model.trim="captcha" class="login_input" placeholder="验证码" type="text">
                        <img class="pointer" @click="refreshCaptcha" :src="captcha_src">
                    </div>
                    <div class="login_btn pointer" @click="register">注册</div>
                    <div class="login_other">
                        <div></div>
                        <div class="pointer" @click="is_login = !is_login">已有账号，登录</div>
                    </div>
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

export default {
    data() {
        return {
            is_login: true,
            username: "",
            password: "",
            password2: "",
            captcha: "",
            captcha_src: "/api/common/captcha"
        }
    },
    methods: {
        async login() {
            if (!this.username || !this.password) {
                return ElMessage({
                    message: '用户名或密码错误！',
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
                this.$router.back();
            }
        },
        async register() {
            if (!this.username || !this.password) {
                return ElMessage({
                    message: '用户名或密码错误！',
                    type: 'error',
                    plain: true,
                });
            }
            if (this.password !== this.password2) {
                return ElMessage({
                    message: '两次密码不一致！',
                    type: 'error',
                    plain: true,
                });
            }

            const formData = new FormData();
            formData.append('username', this.username);
            formData.append('password', this.password);
            formData.append('captcha', this.captcha);
            let response = await this.request("/user/register", "POST", formData);
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
                this.$router.back();
            }
        },
        refreshCaptcha() {
            this.captcha_src = `/api/common/captcha?t=${Date.now()}`;
        },
    },
    mounted() {
        if (this.$route.query?.type) {
            this.is_login = false;
        }
    }
}
</script>

<style scoped>
.login_info {
    width: 1200px;
    height: 16vh;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.login_info>img {
    height: 50%;
}

.login_info>div {
    font-size: 28px;
}

.login_content {
    height: 74vh;
    background-image: url("/images/1688370477913669.png");
    background-position: center;
    background-size: 125% 100%;
}

.login_section {
    width: 1200px;
    margin: 0 auto;
    padding-top: 15vh;
    display: flex;
    justify-content: space-between;
}

.login_wrap {
    box-sizing: border-box;
    width: 400px;
    background-color: #FFFFFF;
    padding: 50px 30px;
    display: flex;
    flex-direction: column;
}

.register_wrap {
    box-sizing: border-box;
    width: 400px;
    background-color: #FFFFFF;
    padding: 50px 30px;
    display: flex;
    flex-direction: column;
}

.login_input {
    padding: 8px 15px;
    margin-bottom: 15px;
    border-radius: 0;
    border: 1px solid var(--color-main-black);
}

.captcha_wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.captcha_wrap>input {
    margin-bottom: 0;
    flex-grow: 1;
    margin-right: 10px;
}

.login_btn {
    background-color: var(--color-main-black);
    color: var(--color-white);
    text-align: center;
    padding: 8px;
}

.login_other {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 14px;
}

.login_other>div:last-child {
    color: var(--color-secondary-black);
}

.copyright {
    display: flex;
    justify-content: center;
    color: var(--color-secondary-black);
    font-size: 12px;
    margin-top: 30px;
}

.copyright a {
    color: var(--color-secondary-black);
}
</style>