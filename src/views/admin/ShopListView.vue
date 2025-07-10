<template>
    <div class="shop_list">
        <div class="query_condition">
            <el-input class="input" v-model="query_cd.id" style="width: 100px" placeholder="ID" />
            <el-input class="input" v-model="query_cd.username" style="width: 200px" placeholder="用户名" />
            <el-input class="input" v-model="query_cd.phone" style="width: 200px" placeholder="手机号" />
            <el-input class="input" v-model="query_cd.email" style="width: 200px" placeholder="邮箱" />
            <el-button type="primary">查询</el-button>
            <el-button>重置</el-button>
        </div>
        <el-table border stripe highlight-current-row :data="tableData">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="username" label="用户名" />
            <el-table-column prop="gender" label="性别" />
            <el-table-column prop="phone" label="手机号" />
            <el-table-column prop="email" label="邮箱" />
            <el-table-column prop="create_time" label="创建时间" />
            <el-table-column label="操作">
                <template #default>
                    <el-button type="primary" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="50" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            query_cd: {
                id: "",
                username: "",
                phone: "",
                email: "",
            },
            tableData: [
                {
                    id: "1",
                    username: "1",
                    gender: "1",
                    phone: "1",
                    email: "1",
                    create_time: "1"
                },
                {
                    id: "2",
                    username: "2",
                    gender: "2",
                    phone: "2",
                    email: "2",
                    create_time: "2"
                },
                {
                    id: "3",
                    username: "3",
                    gender: "3",
                    phone: "3",
                    email: "3",
                    create_time: "3"
                }
            ]
        }
    },
    methods: {

    }
}
</script>

<style scoped>
.shop_list {
    background-color: #FFF;
    padding: 10px;
    box-shadow: 0 0 10px #CCC;
}

.query_condition {
    display: flex;
    margin-bottom: 20px;
}

.query_condition .input {
    margin-right: 10px;
}

.pagination {
    display: flex;
    justify-content: end;
    margin-top: 20px;
}
</style>