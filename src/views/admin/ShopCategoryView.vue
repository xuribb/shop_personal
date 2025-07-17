<template>
    <div class="shop_category">
        <div class="operate_wrap">
            <el-button type="primary" @click="showDialog('save')">新增</el-button>
        </div>
        <el-table border stripe highlight-current-row :data="tableData">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="category_name" label="分类名" />
            <el-table-column prop="order_id" label="排序ID" />
            <el-table-column prop="create_time" label="创建时间" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="showDialog('update', scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="dialog" :title="type == 'save' ? '新增分类' : '修改分类'" width="400">
        <div class="dialog_input_wrap">
            <el-input class="input" v-model.trim="category_name" placeholder="分类名称" autocomplete="off" />
            <el-input class="input" v-model.trim="order_id" placeholder="排序ID" autocomplete="off" />
        </div>
        <template #footer>
            <el-button @click="dialog = false">取消</el-button>
            <el-button type="primary" @click="add2edit">确认</el-button>
        </template>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            dialog: false,
            type: "save",
            category_name: "",
            order_id: 0,
            edit_id: ""
        }
    },
    methods: {
        showDialog(type, row) {
            this.type = type;
            if (type == 'update') {
                this.category_name = row.category_name;
                this.order_id = row.order_id;
                this.edit_id = row.id;
            } else {
                this.category_name = "";
                this.order_id = 0;
            }
            this.dialog = true;
        },
        async query() {
            let response = await this.request("/shop/category", "POST", {
                type: "query"
            });
            if (response === null) {
                return;
            }

            response = await response.json();
            this.tableData = response.data;
        },
        async add2edit() {
            if (!this.category_name) {
                return ElMessage({
                    message: "分类名称不能为空",
                    type: 'error',
                    plain: true,
                });
            }

            let response = null;
            if (this.type == 'save') {
                response = await this.request("/shop/category", "POST", {
                    category_name: this.category_name,
                    order_id: this.order_id,
                    type: this.type
                });
                if (response === null) {
                    return;
                }
            } else if (this.type == 'update') {
                response = await this.request("/shop/category", "POST", {
                    id: this.edit_id,
                    category_name: this.category_name,
                    order_id: this.order_id,
                    type: this.type
                });
                if (response === null) {
                    return;
                }
            }
            response = await response.json();
            ElMessage({
                message: response.msg,
                type: response.status ? 'success' : 'error',
                plain: true,
            });

            this.query();
            this.dialog = false;
        },
        async del(id) {
            let response = await this.request("/shop/category", "POST", {
                id, type: 'delete'
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

            this.query();
        }
    },
    mounted() {
        this.query();
    }
}
</script>

<style scoped>
.shop_category {
    background-color: #FFF;
    padding: 10px;
    box-shadow: 0 0 10px #CCC;
}

.operate_wrap {
    display: flex;
    margin-bottom: 20px;
}

.input {
    margin-bottom: 10px;
}
</style>