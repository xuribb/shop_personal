<template>
    <div class="index">
        <Top />
        <Search />
        <NavBar />
        <RouterView />
        <Bottom />
    </div>
</template>

<script>
import Top from "@/section/client/Top.vue";
import Search from "@/section/client/Search.vue";
import NavBar from "@/section/client/NavBar.vue";
import Bottom from "@/section/client/Bottom.vue";

export default {
    components: {
        Top,
        Search,
        NavBar,
        Bottom
    },
    data() {
        return {
        }
    },
    mounted(){
        console.log(this.$route);
    }
}
</script>

<style scoped></style>