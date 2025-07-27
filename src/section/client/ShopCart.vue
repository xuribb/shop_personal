<template>
    <div class="profile">
        <div class="profile_header">
            <div>购物车</div>
        </div>
        <div class="cart_content">
            <div v-for="(item, index) of locations" :key="item.id" class="location_wrap">
                <div class="location_wrap_left">
                    <div class="location_default" v-if="item.isDefault">默认</div>
                    <div>{{ item.username }}</div>
                    <div>{{ item.phone }}</div>
                    <div>{{ item.address1.join("") + item.address2 }}</div>
                </div>
                <div class="location_wrap_right">
                    <div @click="del(item.id)" class="pointer">
                        <img src="/images/delete.png">
                        <span>删除</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="popup_wrap" v-if="add_popup">
        <div class="popup">
            <div>{{ header }}地址</div>
            <el-input v-model.trim="username" placeholder="姓名" />
            <el-input v-model.trim="phone" placeholder="电话" />
            <el-cascader style="margin-bottom: 15px;width: 100%;" v-model="address1" placeholder="省市区"
                :options="options" />
            <el-input v-model.trim="address2" placeholder="详细地址" />
            <el-switch v-model="isDefault" inline-prompt active-text="设置默认地址" inactive-text="不设置默认地址" />
            <div>
                <el-button @click="cancel">取消</el-button>
                <el-button @click="save" type="primary">保存</el-button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {

        }
    },
    methods: {
        cancel() {
            this.add_popup = false;
        },
        async del(id) {
            let response = await this.request("/user/location", "POST", {
                id, type: "delete"
            });
            if (response === null) {
                return;
            }

            response = await response.json();
            ElMessage({
                message: response.msg,
                type: response.status ? 'success' : 'error',
                plain: true,
            });
            if (response.status) {
                this.query();
            }
        },
        async query() {
            const formData = new FormData();
            formData.append('type', 'query');
            let response = await this.request("/user/shopcart", "POST", formData);
            if (response === null) {
                return;
            }

            response = await response.json();
            if (response.status) {
                console.log(response);
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
        this.query();
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
</style>

<style scoped>
.popup_wrap {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
}

.popup {
    width: 30%;
    margin: 100px auto;
    background-color: #FFF;
    padding: 20px;
    box-shadow: 0 0 10px #000;
}

.popup>div:first-child {
    font-size: 20px;
    margin-bottom: 20px;
    text-align: center;
}

.popup .el-input {
    margin-bottom: 15px;
}

.popup>div:last-child {
    margin-top: 26px;
    text-align: center;
}
</style>