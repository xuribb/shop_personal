<template>
    <div class="profile">
        <div class="profile_header">
            <div>个人信息</div>
            <div @click="edit" class="pointer">
                <img src="/images/bianji.png">
                <span>编辑</span>
            </div>
        </div>
        <div class="profile_content">
            <div>
                <span>头像</span>
                <img :src="info.avatar">
            </div>
            <div>
                <span>用户名</span>
                <span>{{ info.username }}</span>
            </div>
            <div>
                <span>性别</span>
                <span>{{ info.gender }}</span>
            </div>
            <div>
                <span>手机</span>
                <span>{{ info.phone }}</span>
            </div>
            <div>
                <span>邮箱</span>
                <span>{{ info.email }}</span>
            </div>
            <div>
                <span>注册时间</span>
                <span>{{ info.create_time }}</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    components: {
    },
    data() {
        return {
            info: {
                avatar: "/images/alipay.png",
                username: "",
                gender: "",
                phone: "",
                email: "",
                create_time: ""
            }
        }
    },
    methods: {
        edit() {
            alert("edit");
        },
    },
    async mounted() {
        let response = await this.request("/user/info");
        if (response === null) {
            return;
        }

        response = await response.json();
        if (response.status) {
            this.info = response.data;
        } else {
            ElMessage({
                message: response.msg,
                type: 'error',
                plain: true,
            });
        }
    }
}
</script>

<style scoped>
.profile {
    padding: 20px;
    flex-direction: column;
    color: var(--color-white);
}

.profile_header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1px solid var(--color-white);
    padding-bottom: 20px;
    margin-bottom: 20px;
}

.profile_header>div:first-child {
    font-size: 22px;
}

.profile_header>div:last-child {
    display: flex;
    align-items: center;
}

.profile_header>div:last-child>img {
    width: 20px;
    margin-right: 4px;
}

.profile_content>div {
    display: flex;
    margin-bottom: 20px;
}

.profile_content>div>span:first-child {
    flex-basis: 80px;
    text-align: right;
    margin-right: 20px;
}

.profile_content>div:first-child>img {
    width: 50px;
    border-radius: 10px;
}
</style>