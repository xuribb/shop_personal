<template>
    <div class="profile">
        <div class="profile_header">
            <div>收货地址</div>
            <div @click="add" class="pointer">
                <img src="/images/add.png">
                <span>新增</span>
            </div>
        </div>
        <div class="profile_content">
            <div v-for="(item, index) of locations" :key="item.id" class="location_wrap">
                <div class="location_wrap_left">
                    <div class="location_default" v-if="item.isDefault">默认</div>
                    <div>{{ item.username }}</div>
                    <div>{{ item.phone }}</div>
                    <div>{{ item.address1.join("") + item.address2 }}</div>
                </div>
                <div class="location_wrap_right">
                    <div @click="edit(index, item.id)" class="pointer">
                        <img src="/images/edit.png">
                        <span>编辑</span>
                    </div>
                    <div>|</div>
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
            header: "新增",
            add_popup: false,
            options: [
                {
                    "value": "河南省",
                    "label": "河南省",
                    "children": [
                        {
                            "value": "信阳市",
                            "label": "信阳市",
                            "children": [
                                {
                                    "value": "罗山县",
                                    "label": "罗山县"
                                }
                            ]
                        }
                    ]
                },
                {
                    "value": "广东省",
                    "label": "广东省",
                    "children": [
                        {
                            "value": "广州市",
                            "label": "广州市",
                            "children": [
                                {
                                    "value": "天河区",
                                    "label": "天河区"
                                },
                                {
                                    "value": "白云区",
                                    "label": "白云区"
                                }
                            ]
                        }
                    ]
                }
            ],
            locations: [],
            edit_id: "",
            username: "",
            phone: "",
            address1: [],
            address2: "",
            isDefault: false,
        }
    },
    methods: {
        add() {
            this.username = "";
            this.phone = "";
            this.address1 = [];
            this.address2 = "";
            this.isDefault = false;
            this.header = "新增";
            this.add_popup = true;
        },
        cancel() {
            this.add_popup = false;
        },
        async save() {
            if (!this.username || !this.phone || !this.address1 || !this.address2) {
                return ElMessage({
                    message: "表单中不能有数据为空",
                    type: 'error',
                    plain: true,
                });
            }

            let response = null;
            this.isDefault = Number(this.isDefault);
            if (this.header === "新增") {
                response = await this.request("/user/location", "POST", {
                    username: this.username,
                    phone: this.phone,
                    address1: this.address1,
                    address2: this.address2,
                    isDefault: this.isDefault,
                    type: "save"
                });
            } else if (this.header === "修改") {
                response = await this.request("/user/location", "POST", {
                    id: this.edit_id,
                    username: this.username,
                    phone: this.phone,
                    address1: this.address1,
                    address2: this.address2,
                    isDefault: this.isDefault,
                    type: "update"
                });
            }
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
                this.edit_id = "";
                this.add_popup = false;
            }
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
        async edit(index, id) {
            this.username = this.locations[index].username;
            this.phone = this.locations[index].phone;
            this.address1 = this.locations[index].address1;
            this.address2 = this.locations[index].address2;
            this.isDefault = Boolean(this.locations[index].isDefault);
            this.header = "修改";
            this.add_popup = true;
            this.edit_id = id;
        },
        async query() {
            let response = await this.request("/user/location", "POST", {
                type: "query"
            });
            if (response === null) {
                return;
            }

            response = await response.json();
            if (response.status) {
                response.data.forEach(element => {
                    element.address1 = JSON.parse(element.address1);
                });
                this.locations = response.data;
            } else {
                ElMessage({
                    message: response.msg,
                    type: 'error',
                    plain: true,
                });
            }
        }
    },
    async mounted() {
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

.profile_header>div:last-child {
    display: flex;
    align-items: center;
}

.profile_header>div:last-child>img {
    width: 20px;
    margin-right: 4px;
}

.location_wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    color: var(--color-main-black);
    background-color: var(--color-white);
    padding: 10px 20px;
    font-size: 14px;
    margin-bottom: 10px;
}

.location_wrap_left {
    display: flex;
    align-items: center;
}

.location_wrap_left>div {
    margin-right: 10px;
}

.location_default {
    color: var(--color-white);
    background-color: var(--color-secondary-black);
    font-size: 12px;
    padding: 3px;
    border-radius: 5px;
}

.location_wrap_right {
    display: flex;
    align-items: center;
}

.location_wrap_right>div:nth-child(odd) {
    display: flex;
    align-items: center;
}

.location_wrap_right>div:nth-child(2) {
    margin: 0 10px;
}

.location_wrap_right img {
    width: 16px;
    margin-right: 2px;
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