<template>
    <div class="navbar" @click="toCategory">
        <div :class="{ 'item': true, active: $route.params.category_id == undefined }" data-id="0">首页</div>
        <div :class="{ 'item': true, active: $route.params.category_id == item.id }" :data-id="item.id" v-for="item of navbar"
            :key="item.id">{{ item.category_name }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navbar: null
        }
    },
    methods: {
        toCategory(e) {
            const id = Number(e.target.dataset.id);
            let category_name = '首页';

            for (const item of this.navbar) {
                if(item.id == id){
                    category_name = item.category_name;
                    break;
                }
            }

            if (id) {
                this.$router.push(`/category/${id}/${category_name}`);
            } else {
                this.$router.push("/");
            }
        },
        async getTabBar() {
            const formData = new FormData();
            formData.append('type', 'query');
            let response = await this.request("/shop/category", "POST", formData);
            if (response === null) {
                return;
            }

            response = await response.json();
            if (response.status) {
                this.navbar = response.data;
            }
        }
    },
    created() {
        this.getTabBar();
    }
}
</script>

<style scoped>
.navbar {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    margin-bottom: 2px;
    border-bottom: 2px solid var(--color-main-black);
}

.item {
    padding: 10px 20px;
    cursor: pointer;
}

.active {
    background-color: var(--color-main-black);
    color: var(--color-white);
}

.content {

    font-size: 12px;
    color: var(--color-white);

}

.pointer {
    cursor: pointer;
}
</style>