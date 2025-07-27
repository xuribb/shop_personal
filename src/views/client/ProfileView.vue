<template>
    <div class="profile">
        <Top />
        <div class="profile_info">
            <RouterLink to="/"><img src="/images/logo.png"></RouterLink>
            <div>会员中心</div>
        </div>
        <div class="profile_wrap">
            <div class="profile_nav">
                <RouterLink to="/profile">
                    <img src="/images/gerenxinxi.png">
                    <span>个人信息</span>
                </RouterLink>
                <RouterLink to="/profile/location">
                    <img src="/images/wodedizhi.png">
                    <span>收货地址</span>
                </RouterLink>
                <RouterLink to="/profile/shopcart">
                    <img src="/images/wodedizhi.png">
                    <span>购物车</span>
                </RouterLink>
                <RouterLink to="/profile">
                    <img src="/images/anquanshezhi.png">
                    <span>安全设置</span>
                </RouterLink>
                <RouterLink to="/profile">
                    <img src="/images/wodexiaoxi.png">
                    <span>我的消息</span>
                </RouterLink>
                <RouterLink to="/profile">
                    <img src="/images/anquantuichu.png">
                    <span>安全退出</span>
                </RouterLink>
            </div>
            <div class="profile_content">
                <RouterView />
            </div>
        </div>
        <Bottom />
    </div>
</template>

<script>
import Top from "@/section/client/Top.vue";
import Bottom from "@/section/client/Bottom.vue";

export default {
    components: {
        Top,
        Bottom
    },
    data() {
        return {
        }
    },
    mounted() {

    }
}
</script>

<style scoped>
.profile_info {
    width: 1200px;
    height: 16vh;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.profile_info img {
    height: 60px;
}

.profile_info>div {
    font-size: 28px;
}
</style>

<style scoped>
.profile_wrap {
    width: 1200px;
    margin: 0 auto 40px;
    display: flex;
    justify-content: space-between;
}

.profile_nav {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-basis: 160px;
    background-color: var(--color-main-black);
}

.profile_nav>a {
    display: flex;
    align-items: center;
    margin-bottom: 26px;
    padding-left: 20px;
    color: var(--color-white);
}

.profile_nav>a>img {
    width: 24px;
    margin-right: 6px;
}

.profile_nav>a:first-child {
    margin-top: 34px;
}

.profile_content {
    flex-basis: 1020px;
    background-color: var(--color-main-black);
}
</style>