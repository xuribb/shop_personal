<template>
    <div class="copyright">
        <div>版权所有：云购未来商务有限公司</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <div>ICP备案：<a href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备2024110969号-1</a></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
}
</script>

<style scoped>
.copyright {
    display: flex;
    justify-content: center;
    color: var(--color-white);
    background-color: var(--color-main-black);
    font-size: 12px;
    padding: 8px 0;
}

.copyright a {
    color: var(--color-white);
}
</style>