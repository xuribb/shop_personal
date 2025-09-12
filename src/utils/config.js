export const DOMAIN = "";
export const request = async (url, method = "GET", body = "") => {
    try {
        let options = null;
        if (method !== "GET") {
            options = { method, body };
        }
        return fetch(DOMAIN + url, options);
    } catch {
        //ElMessage 全局组件
        ElMessage({
            message: '网络请求失败，请稍后重试',
            type: 'error',
            plain: true,
        });
    }
}