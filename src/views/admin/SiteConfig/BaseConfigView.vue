<template>
    <div class="base_config">
        <div>基本设置</div>
        <div class="input_wrap">
            <span>网站名称：</span><el-input class="input" v-model.trim="site_name" />
        </div>
        <div class="input_wrap">
            <span>网站LOGO：</span><input type="file" class="input" @change="change_img" />
        </div>
        <img :src="bbcc" alt="">
        <div class="box_cropper">
            <vue-cropper ref="cropper" :src="site_logo" :view-mode="2"></vue-cropper>
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
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
    components: { VueCropper },
    data() {
        return {
            bbcc: "",
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
            const formData = new FormData();
            formData.append('type', 'query');
            let response = await this.request("/config/base_config", "POST", formData);
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
        edit() {
            const canvas = this.$refs.cropper.getCroppedCanvas();
            if (canvas) {
                canvas.toBlob(this.uploadData);
            } else {
                this.uploadData(null);
            }
        },
        async uploadData(blob) {
            const formData = new FormData();
            formData.append("type", "update");
            formData.append("site_name", this.site_name);
            if (blob) {
                formData.append("site_logo", blob, "site_logo.png");
            } else {
                formData.append("site_logo", blob);
            }
            formData.append("beian", this.beian);
            formData.append("com_name", this.com_name);
            formData.append("com_loc", this.com_loc);
            formData.append("kefu_tel", this.kefu_tel);
            formData.append("kefu_qq", this.kefu_qq);

            let response = await this.request("/config/base_config", "POST", formData);
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
            const file = e.target.files[0];
            if (file.type.indexOf('image/') === -1) {
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                this.site_logo = event.target.result;
                this.$refs.cropper.replace(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    },
    mounted() {
        this.query();
    }
}
</script>

<style>
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

.box_cropper {
    /* box-shadow: 0 3px 5px 1px #cfcfcf; */
    /* border: 10px solid white; */
    width: 500px;
    /* height: 500px; */
    /* overflow-y: scroll; */
}
</style>
