<template>
    <div class="search">
        <div class="content">
            <img class="logo" src="/images/logo.png">
            <div class="search_content">
                <input type="text">
                <span>搜索</span>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
.search {
    padding: 30px 0;
}

.content {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
}

.logo{
    height: 40px;
}

.search_content {
    display: flex;
    align-items: center;
}

.search_content>input {
    width: 300px;
    height: 40px;
    box-sizing: border-box;
    border: 1px solid var(--color-main-black);
    outline: none;
    padding-left: 10px;
}

.search_content>span {
    background-color: var(--color-main-black);
    color: var(--color-white);
    width: 80px;
    line-height: 40px;
    text-align: center;
}
</style>