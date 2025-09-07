export const DOMAIN = "/api";
export const request = async (url, method = "GET", body = "") => {
    try {
        let options = null;
        if (method !== "GET") {
            options = { method, body };
        }
        return await fetch(DOMAIN + url, options);
    } catch {
        return null;
    }
}