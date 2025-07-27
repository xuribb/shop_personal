<template>
    <div class="shop_list">
        <div class="query_condition">
            <div>
                <el-input class="input" v-model="query_cd.id" style="width: 100px" placeholder="ID" />
                <el-select class="input" v-model="query_cd.category_id" style="width: 200px" placeholder="商品分类">
                    <el-option v-for="item in shop_category" :key="item.id" :label="item.category_name"
                        :value="item.id" />
                </el-select>
                <el-input class="input" v-model="query_cd.shop_name" style="width: 200px" placeholder="商品名称" />
                <el-button type="primary" @click="query(this.query_cd)">查询</el-button>
                <el-button @click="reset_btn">重置</el-button>
            </div>
            <div>
                <el-button type="success" @click="showDialog('save')">新增</el-button>
            </div>
        </div>
        <el-table border stripe highlight-current-row :data="tableData">
            <el-table-column prop="id" label="ID" />
            <el-table-column :formatter="formatter" prop="category_id" label="商品分类" />
            <el-table-column prop="shop_name" label="商品名称" />
            <el-table-column prop="shop_desc" label="商品描述" />
            <el-table-column prop="shop_price" label="商品价格" />
            <el-table-column label="商品图片">
                <template #default="scope">
                    <img :src="scope.row.shop_img">
                </template>
            </el-table-column>
            <el-table-column prop="inventory" label="库存" />
            <el-table-column prop="sales" label="销售额" />
            <el-table-column prop="create_time" label="创建时间" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="showDialog('update', scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background layout="total,sizes,prev,pager,next,jumper" @change="change_status"
                v-model:current-page="query_cd.page_num" v-model:page-size="query_cd.page_size" :total="total" />
        </div>
    </div>
    <el-dialog v-model="dialog" :title="type == 'save' ? '新增商品' : '修改商品'" width="400">
        <div class="dialog_input_wrap">
            <el-select class="input" v-model="shop.category_id" placeholder="商品分类">
                <el-option v-for="item in shop_category" :key="item.id" :label="item.category_name" :value="item.id" />
            </el-select>
            <el-input class="input" v-model.trim="shop.shop_name" placeholder="商品名称" autocomplete="off" />
            <el-input class="input" v-model.trim="shop.shop_desc" placeholder="商品描述" autocomplete="off" />
            <el-input class="input" v-model.trim="shop.shop_price" placeholder="商品价格" autocomplete="off" />
            <div class="shopImg_wrap">
                <label for="uploadfile">上传商品图片</label>
                <input type="file" accept="image/*" @change="selectImg" style="display: none;" id="uploadfile">
                <!-- <img :src="shop.shop_img"> -->
                <!-- <el-input class="input" v-model.trim="shop.shop_img" placeholder="商品图片" autocomplete="off" /> -->
            </div>
            <el-input class="input" v-model.trim="shop.inventory" placeholder="库存" autocomplete="off" />
            <el-input class="input" v-model.trim="shop.sales" placeholder="销售额" autocomplete="off" />
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
            query_cd: {
                id: "",
                category_id: "",
                shop_name: "",
                page_num: 1,
                page_size: 10
            },
            total: 0,
            tableData: [],
            shop_category: [],
            shop: {
                category_id: null,
                shop_name: null,
                shop_desc: null,
                shop_price: null,
                shop_img: null,
                inventory: 0,
                sales: 0
            },
            edit_id: null,
            type: "save",
            dialog: false,
        }
    },
    methods: {
        showDialog(type, row) {
            this.type = type;
            if (type == 'update') {
                this.shop.category_id = row.category_id;
                this.shop.shop_name = row.shop_name;
                this.shop.shop_desc = row.shop_desc;
                this.shop.shop_price = row.shop_price;
                this.shop.shop_img = row.shop_img;
                this.shop.inventory = row.inventory;
                this.shop.sales = row.sales;
                this.edit_id = row.id;
            } else {
                this.shop = {
                    category_id: null,
                    shop_name: null,
                    shop_desc: null,
                    shop_price: null,
                    shop_img: null,
                    inventory: 0,
                    sales: 0
                };
            }
            this.dialog = true;
        },
        async query(query_cd) {
            const formData = new FormData();
            for (const key in query_cd) {
                formData.append(key, query_cd[key]);
            }
            formData.append('type', 'query');

            let response = await this.request("/shop/list", "POST", formData);
            if (response === null) {
                return;
            }

            response = await response.json();
            this.tableData = response.data;
            this.total = response.data[0]?.total;
        },
        reset_btn() {
            this.query_cd.id = "";
            this.query_cd.category_id = "";
            this.query_cd.shop_name = "";
            this.query_cd.page_num = 1;
        },
        change_status() {
            this.query(this.query_cd);
        },
        selectImg(e) {
            this.shop.shop_img = e.target.files[0];
        },
        async add2edit() {
            if (!this.shop.category_id) {
                return ElMessage({
                    message: "商品分类不能为空",
                    type: 'error',
                    plain: true,
                });
            }
            if (!this.shop.shop_name) {
                return ElMessage({
                    message: "商品名称不能为空",
                    type: 'error',
                    plain: true,
                });
            }
            if (!this.shop.shop_desc) {
                return ElMessage({
                    message: "商品描述不能为空",
                    type: 'error',
                    plain: true,
                });
            }
            if (!this.shop.shop_price) {
                return ElMessage({
                    message: "商品价格不能为空",
                    type: 'error',
                    plain: true,
                });
            }
            if (!this.shop.shop_img) {
                return ElMessage({
                    message: "商品图片不能为空",
                    type: 'error',
                    plain: true,
                });
            }

            let response = null;
            const formData = new FormData();
            formData.append('type', this.type);
            for (const key in this.shop) {
                formData.append(key, this.shop[key]);
            }

            if (this.type == 'save') {
                response = await this.request("/shop/list", "POST", formData);
                if (response === null) {
                    return;
                }
            } else if (this.type == 'update') {
                formData.append('id', this.edit_id);
                response = await this.request("/shop/list", "POST", formData);
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

            this.query(this.query_cd);
            this.dialog = false;
        },
        async del(id) {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('type', 'delete');
            let response = await this.request("/shop/list", "POST", formData);
            if (response === null) {
                return;
            }

            response = await response.json();
            ElMessage({
                message: response.msg,
                type: response.status ? 'success' : 'error',
                plain: true,
            });

            this.query(this.query_cd);
        },
        async getShopCategory() {
            const formData = new FormData();
            formData.append('type', 'query');
            let response = await this.request("/shop/category", "POST", formData);
            if (response === null) {
                return;
            }

            response = await response.json();
            this.shop_category = response.data;
        },
        formatter(row, col, cell_value) {
            for (const shop_category of this.shop_category) {
                if (shop_category.id === cell_value) {
                    return shop_category.category_name;
                }
            }
        }
    },
    mounted() {
        this.query(this.query_cd);
        this.getShopCategory();
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
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.query_condition>div:first-child>.input {
    margin-right: 10px;
}

.shopImg_wrap {
    display: flex;
    margin-bottom: 10px;
}

.dialog_input_wrap>.input {
    margin-bottom: 10px;
}

.pagination {
    display: flex;
    justify-content: end;
    margin-top: 20px;
}
</style>