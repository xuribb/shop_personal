<template>
    <div class="bottom">
        <div class="content">
            <div class="section" v-for="article in articles" :key="article.id">
                <div class="section_header">{{ article.label }}</div>
                <div class="pointer" @click="toArticle(item.id, item.label)" v-for="item in article.children"
                    :key="item.id">{{
                        item.label }}</div>
            </div>

            <div class="section company_info">
                <div class="section_header">公司信息</div>
                <div class="pointer">
                    <img src="/images/dianhua.png">
                    <span>19874296340</span>
                </div>
                <div class="pointer">
                    <img src="/images/dizhiguanli.png">
                    <span>四川省成都市锦江区走马街32号3栋1单元10层1019号</span>
                </div>
                <div class="pointer">
                    <img src="/images/gongsi.png">
                    <span>成都宏盛呈运科技有限公司</span>
                </div>
            </div>
        </div>
        <copy-right />
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
            articles: [],
        }
    },
    methods: {
        async getArticles() {
            const formData = new FormData();
            formData.append('type', 'query');
            let response = await this.request("/article/article", "POST", formData);
            if (response === null) {
                return;
            }
            response = await response.json();
            if (response.status) {
                const dataSource = [];
                for (const element of response.data) {
                    if (element.pid === null) {
                        dataSource.push({
                            id: element.id,
                            label: element.name,
                            children: []
                        });
                    }
                }

                for (const element of response.data) {
                    if (element.pid === 0) {
                        continue;
                    }
                    for (const parent of dataSource) {
                        if (element.pid === parent.id) {
                            parent.children.push({
                                id: element.id,
                                label: element.name,
                                children: []
                            });
                            break;
                        }
                    }
                }
                this.articles = dataSource;
            }
        },
        toArticle(id, title) {
            this.$router.push(`/article/${id}/${title}`);
        }
    },
    mounted() {
        this.getArticles();
    }
}
</script>

<style scoped>
.bottom {
    background-color: var(--color-main-black);
    padding: 20px 0;
}

.content {
    width: 1200px;
    display: flex;
    color: var(--color-white);
    margin: 0 auto;
}

.section {
    width: 200px;
    margin-right: 20px;
}

.section_header {
    font-size: 20px;
    font-weight: bold;
}

.company_info {
    font-size: 12px;
    width: auto;
    margin-right: 0;
}

.company_info img {
    width: 14px;
    margin-right: 5px;
}

.company_info .pointer {
    display: flex;
    align-items: center;
    cursor: text;
}

.pointer {
    cursor: pointer;
    margin-top: 10px;
}

.copyright {
    display: flex;
    justify-content: center;
    color: var(--color-white);
    font-size: 12px;
    margin-top: 30px;
}

.copyright a {
    color: var(--color-white);
}
</style>