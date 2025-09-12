<template>
    <div class="index">

    </div>
</template>

<script>
export default {
    data() {
        return {
            info: "admin"
        }
    },
    mounted() {
        const username = sessionStorage.getItem("username");
        if (!username || username != "admin") {
            sessionStorage.clear();
            this.$router.push("/admin/login");
        }
    }
}
</script>

<style scoped>
.index {
    width: 100%;
    height: 600px;
    background-color: red;
}
</style>