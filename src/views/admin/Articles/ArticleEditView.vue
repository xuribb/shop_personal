<template>
    <div class="article_edit">
        <div>
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                :mode="mode" />
            <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
                :mode="mode" @onCreated="handleCreated" />
        </div>
        <div>
            <el-button type="primary" @click="updateInfo">保存</el-button>
            <el-button type="info" @click="$router.back()">返回</el-button>
        </div>
    </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, getCurrentInstance } from 'vue'
import { useRoute,useRouter } from 'vue-router';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
    components: { Editor, Toolbar },
    setup() {
        const { domain } = getCurrentInstance().appContext.config.globalProperties;
        const route = useRoute();
        const router = useRouter();
        // 编辑器实例，必须用 shallowRef
        const editorRef = shallowRef()

        const valueHtml = ref("");

        const query = () => {
            const formData = new FormData();
            formData.append('type', 'query');
            formData.append('aid', route.params.id);

            fetch(domain + "/article/detail", {
                method: "POST",
                body: formData
            }).then(data => {
                return data.json();
            }).then(data => {
                valueHtml.value = data.data;
            }).catch(e => {
                ElMessage({
                    message: e.message,
                    type: 'error',
                    plain: true,
                });
            });
        }

        const updateInfo = () => {
            const formData = new FormData();
            formData.append('type', 'update');
            formData.append('aid', route.params.id);
            formData.append('content', valueHtml.value);

            fetch(domain + "/article/detail", {
                method: "POST",
                body: formData
            }).then(data => {
                return data.json();
            }).then(data => {
                ElMessage({
                    message: data.msg,
                    type: data.status ? 'success' : 'error',
                    plain: true,
                });
                query();
            }).catch(e => {
                ElMessage({
                    message: e.message,
                    type: 'error',
                    plain: true,
                });
            });
        }

        const toolbarConfig = {}
        const editorConfig = { placeholder: '请输入内容...' }

        // 组件销毁时，也及时销毁编辑器
        onBeforeUnmount(() => {
            const editor = editorRef.value
            if (editor == null) return
            editor.destroy()
        })

        const handleCreated = (editor) => {
            editorRef.value = editor // 记录 editor 实例，重要！
        }


        onMounted(query);

        return {
            editorRef,
            valueHtml,
            mode: 'simple', // 或 'simple'
            toolbarConfig,
            editorConfig,
            handleCreated,
            updateInfo
        }
    },
}
</script>

<style scoped>
.article_edit>div:first-child {
    box-shadow: 0 0 10px #CCC;
}

.article_edit>div:last-child {
    padding: 14px;
    background-color: #FFF;
    border-top: 1px solid #CCC;
    box-shadow: 0 0 10px #CCC;
}
</style>