<template>
    <div class="article">
        <div class="article_operate">
            <el-button type="primary" @click="add(null)">新增顶级分类</el-button>
        </div>
        <el-tree :data="dataSource" node-key="id">
            <template #default="{ node, data }">
                <div class="custom-tree-node">
                    <span>{{ node.label }}</span>
                    <div>
                        <el-button type="primary" link @click="add(data.id)">新增</el-button>
                        <el-button style="margin-left: 6px" type="warning" link @click="edit(data.id)">编辑名称</el-button>
                        <el-button v-if="data.children.length === 0" style="margin-left: 6px" type="warning" link
                            @click="edit2(data.id)">编辑内容</el-button>
                        <el-button style="margin-left: 6px" type="danger" link @click="remove(data.id)">删除</el-button>
                    </div>
                </div>
            </template>
        </el-tree>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataSource: [],
        };
    },
    methods: {
        add(pid) {
            ElMessageBox.prompt('请输入分类名称', '新增分类')
                .then(async ({ value }) => {
                    if (!value || value.trim() == '') {
                        return ElMessage({
                            type: 'error',
                            message: "分类名错误",
                        });
                    }

                    const formData = new FormData();
                    formData.append('type', 'save');
                    formData.append('pid', pid);
                    formData.append('name', value);
                    let response = await this.request("/article/article", "POST", formData);
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
                })
        },
        edit(id) {
            ElMessageBox.prompt('请输入分类名称', '编辑分类')
                .then(async ({ value }) => {
                    if (!value || value.trim() == '') {
                        return ElMessage({
                            type: 'error',
                            message: "分类名错误",
                        });
                    }

                    const formData = new FormData();
                    formData.append('type', 'update');
                    formData.append('id', id);
                    formData.append('name', value);
                    let response = await this.request("/article/article", "POST", formData);
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
                })
        },
        edit2(id) {
            this.$router.push(`/admin/articles/edit/${id}`);
        },
        async remove(id) {
            const formData = new FormData();
            formData.append('type', 'delete');
            formData.append('id', id);
            let response = await this.request("/article/article", "POST", formData);
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
            let response = await this.request("/article/article", "POST", formData);
            if (response === null) {
                return;
            }
            response = await response.json();
            if (response.status) {
                const dataSource = [];
                for (const element of response.data) {
                    if (element.pid === null) {
                        dataSource.push({
                            id: element.id,
                            label: element.name,
                            children: []
                        });
                    }
                }

                for (const element of response.data) {
                    if (element.pid === 0) {
                        continue;
                    }
                    for (const parent of dataSource) {
                        if (element.pid === parent.id) {
                            parent.children.push({
                                id: element.id,
                                label: element.name,
                                children: []
                            });
                            break;
                        }
                    }
                }
                this.dataSource = dataSource;
            }
        }
    },
    mounted() {
        this.query();
    }
};
</script>

<style scoped>
.article {
    min-height: 85vh;
    background-color: #FFF;
    padding: 20px;
}

.article_operate {
    margin-bottom: 20px;
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
</style>