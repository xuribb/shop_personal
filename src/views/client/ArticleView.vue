<template>
    <div class="article">
        <div class="header">
            <img src="/images/logo.png">
            <div>我的商城</div>
        </div>
        <div class="content">
            <div>文章最后更新时间：{{ content.update_time }}</div>
            <div>{{ $route.params.title }}</div>
            <div v-html="content.content"></div>
        </div>
        <copy-right class="copy_right" />
    </div>
</template>

<script>
import CopyRight from "@/section/client/CopyRight.vue";
export default {
    components: {
        CopyRight
    },
    data() {
        return {
            content: ""
        }
    },
    methods: {
        async getArticle() {
            const formData = new FormData();
            formData.append('type', 'query');
            formData.append('aid', this.$route.params.id);
            let response = await this.request("/article/detail", "POST", formData);
            if (response === null) {
                return;
            }
            response = await response.json();
            if (response.status) {
                this.content = response.data;
            } else {
                ElMessage({
                    message: response.msg,
                    type: 'error',
                    plain: true,
                });
            }
        }
    },
    mounted() {
        this.getArticle();
    }
}
</script>

<style scoped>
.article {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.header {
    width: 1200px;
    margin: 0 auto;
    height: 16vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header>img {
    height: 50%;
}

.header>div {
    font-size: 28px;
}
</style>

<style scoped>
.content {
    width: 1200px;
    margin: 0 auto;
}

.content>div:first-child {
    font-size: 13px;
    margin-bottom: 30px;
    color: var(--color-main-black);
}

.content>div:nth-child(2) {
    margin: 10px 0;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
}

.content>div:nth-child(3) {
    text-indent: 2em;
}

.copy_right {
    position: sticky;
    bottom: 0;
    margin-top: auto;
}
</style>