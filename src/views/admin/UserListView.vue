<template>
    <div class="user_list">
        <div class="query_condition">
            <el-input class="input" v-model="query_cd.id" style="width: 100px" placeholder="ID" />
            <el-input class="input" v-model="query_cd.username" style="width: 200px" placeholder="用户名" />
            <el-input class="input" v-model="query_cd.phone" style="width: 200px" placeholder="手机号" />
            <el-input class="input" v-model="query_cd.email" style="width: 200px" placeholder="邮箱" />
            <el-button type="primary" @click="query_btn">查询</el-button>
            <el-button @click="reset_btn">重置</el-button>
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
            <el-pagination background layout="total,sizes,prev,pager,next,jumper" @change="change_status"
                v-model:current-page="query_cd.page_num" v-model:page-size="query_cd.page_size" :total="total" />
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
                page_num: 1,
                page_size: 10
            },
            total: 0,
            tableData: []
        }
    },
    methods: {
        async query(query_cd) {
            let response = await this.request("/user/list", "POST", query_cd);
            if (response === null) {
                return;
            }
            response = await response.json();
            if (response.status) {
                this.tableData = response.data;
                this.total = response.data[0]?.total;
            } else {
                ElMessage({
                    message: response.msg,
                    type: 'error',
                    plain: true,
                });
            }
        },
        query_btn() {
            this.query(this.query_cd);
        },
        reset_btn() {
            this.query_cd.id = "";
            this.query_cd.username = "";
            this.query_cd.phone = "";
            this.query_cd.email = "";
            this.query_cd.page_num = 1;
        },
        change_status() {
            this.query(this.query_cd);
        }
    },
    mounted() {
        this.query(this.query_cd);
    }
}
</script>

<style scoped>
.user_list {
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