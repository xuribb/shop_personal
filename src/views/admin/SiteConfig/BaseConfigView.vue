<template>
    <div class="base_config">
        <div>基本设置</div>
        <div class="input_wrap">
            <span>网站名称：</span><el-input class="input" v-model.trim="site_name" />
        </div>
        <div class="input_wrap">
            <span>网站LOGO：</span><input type="file" class="input" @change="change_img" />
        </div>

        <div class="input_wrap">
            <span>域名备案号：</span><el-input class="input" v-model.trim="beian" />
        </div>
        <div class="input_wrap">
            <span>公司名称：</span><el-input class="input" v-model.trim="com_name" />
        </div>
        <div class="input_wrap">
            <span>公司地址：</span><el-input class="input" v-model.trim="com_loc" />
        </div>
        <div class="input_wrap">
            <span>客服电话：</span><el-input class="input" v-model.trim="kefu_tel" />
        </div>
        <div class="input_wrap">
            <span>客服QQ：</span><el-input class="input" v-model.trim="kefu_qq" />
        </div>
        <el-button type="warning" @click="edit">保存</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            site_name: null,
            site_logo: null,
            beian: null,
            com_name: null,
            com_loc: null,
            kefu_tel: null,
            kefu_qq: null
        }
    },
    methods: {
        async query() {
            let response = await this.request("/config/base_config", "POST", {
                type: "query"
            });
            if (response === null) {
                return;
            }

            response = await response.json();
            if (response.status) {
                this.site_name = response.data.site_name;
                this.site_logo = response.data.site_logo;
                this.beian = response.data.beian;
                this.com_name = response.data.com_name;
                this.com_loc = response.data.com_loc;
                this.kefu_tel = response.data.kefu_tel;
                this.kefu_qq = response.data.kefu_qq;
            }
        },
        async edit() {
            let response = await this.request("/config/base_config", "POST", {
                type: "update",
                site_name: this.site_name,
                site_logo: this.site_logo,
                beian: this.beian,
                com_name: this.com_name,
                com_loc: this.com_loc,
                kefu_tel: this.kefu_tel,
                kefu_qq: this.kefu_qq
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
        change_img(e) {
            console.log(e.target.files);
        }
    },
    mounted() {
        this.query();
    }
}
</script>

<style scoped>
.base_config {
    margin: 0 15px;
}

.base_config>div:first-child {
    margin-bottom: 15px;
}

.input_wrap {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.input {
    width: 300px;
}
</style>
