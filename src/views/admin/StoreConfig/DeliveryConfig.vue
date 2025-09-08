<template>
    <div class="delivery_config">
        <el-button type="primary" class="add_btn" @click="dialogVisible = true">新增</el-button>
        <el-table :data="tableData" stripe border highlight-current-row>
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="way" label="配送方式" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button link type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="dialogVisible" title="新增配送方式" width="500">
            <el-select v-model="selected" placeholder="请选择">
                <el-option v-for="item in delivery" :key="item" :label="item" :value="item" />
            </el-select>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="add">确认</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            delivery: ["快递邮寄", "上门自取", "无实体货物"],
            dialogVisible: false,
            selected: null
        }
    },
    methods: {
        async getDelivery() {
            const formData = new FormData();
            formData.append('type', 'query');
            let response = await this.request("/store/delivery", "POST", formData);
            if (response === null) {
                return;
            }

            response = await response.json();
            if (response.status) {
                this.tableData = response.data;
            }
        },
        async add() {
            this.dialogVisible = false;
            if (!this.selected) {
                return;
            }
            for (const item of this.tableData) {
                if (item.way == this.selected) {
                    return ElMessage({
                        message: '已包含指定方式，请选择其他',
                        type: 'error',
                        plain: true,
                    });
                }
            }

            const formData = new FormData();
            formData.append('type', 'save');
            formData.append('way', this.selected);
            await this.request("/store/delivery", "POST", formData);
            this.getDelivery();
        },
        async del(id) {
            const formData = new FormData();
            formData.append('type', 'delete');
            formData.append('id', id);
            await this.request("/store/delivery", "POST", formData);
            this.getDelivery();
        }
    },
    mounted() {
        this.getDelivery();
    }
}
</script>

<style scoped>
.add_btn {
    margin: 10px 0;
}
</style>