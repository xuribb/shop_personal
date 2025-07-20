<template>
    <div class="pass_edit">
        <div>修改密码</div>
        <el-input class="input" type="password" show-password v-model.trim="password_old" placeholder="旧密码" />
        <el-input class="input" type="password" show-password v-model.trim="password_new" placeholder="新密码" />
        <el-input class="input" type="password" show-password v-model.trim="password_new2" placeholder="再次输入新密码" />
        <el-button type="warning" @click="edit">修改</el-button>
        <el-button type="info" @click="reset">重置</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            password_old: null,
            password_new: null,
            password_new2: null
        }
    },
    methods: {
        async edit() {
            let flag = false;
            let message = "";
            if (!this.password_old) {
                message = "旧密码错误";
                flag = true;
            }
            if (!this.password_new) {
                message = "新密码错误";
                flag = true;
            }
            if (this.password_new !== this.password_new2) {
                message = "两次密码不一致";
                flag = true;
            }
            if (flag) {
                return ElMessage({
                    message,
                    type: 'error',
                    plain: true,
                });
            }

            let response = await this.request("/user/pass_edit", "POST", {
                password_old: this.password_old,
                password_new: this.password_new
            });
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
                this.reset();
            }
        },
        reset() {
            this.password_old = null;
            this.password_new = null;
            this.password_new2 = null;
        }
    }
}
</script>

<style scoped>
.pass_edit {
    margin: 0 15px;
    width: 300px;
}

.pass_edit>div:first-child {
    margin-bottom: 15px;
}

.input {
    margin-bottom: 10px;
}
</style>