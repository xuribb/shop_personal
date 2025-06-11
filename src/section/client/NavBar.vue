<template>
    <div class="navbar">
        <div class="item active">首页</div>
        <div class="item">家用电器</div>
        <div class="item">箱包产品</div>
        <div class="item">母婴用品</div>
        <div class="item">家具纺织品</div>
    </div>
</template>

<script>

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