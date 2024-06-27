/*
    credentials 是用于控制跨域请求中是否发送凭据（如 cookie、HTTP 认证等）的属性。它是一个布尔值属性，可以接受以下三种值：
    "omit"：不包含凭据信息，即不发送 cookie 等凭据。
    "same-origin"：仅在请求 URL 与调用脚本位于同一源时包含凭据。
"    include"：总是包含凭据，即始终发送 cookie 等凭据。
 */
export async function getJson(url) {
    // alert(url);
    let res = await fetch(url, { method: "GET", credentials: "include" });
    //解析响应的json数据并返回
    if (res.status == 401){
        return LOGIN_EXPIRED;
    }
    if (res.status !== 200){
        return DUMMY_RESPONSE;
    }
    return res.json();
}

export async function get(url) {
    let res = await fetch(url, { method: "GET", credentials: "include" });
    if(res.status === 401){
        return LOGIN_EXPIRED;
    }
    if(res.status !== 200){
        return DUMMY_RESPONSE;
    }
    return res;
}

export async function put(url, data) {
    let opts = {
        method: "PUT",
        body: JSON.stringify(data), // 将数据转换为JSON字符串作为请求体
        headers: {
            // 设置请求头Content-Type为application/json,表明请求的主体内容是 JSON 格式的数据。这样做的目的是告诉服务器，请求中包含的数据是以 JSON 格式编码的
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };
    let res = await fetch(url, opts);
    if(res.status === 401){
        return LOGIN_EXPIRED;
    }
    if(res.status !== 200){
        return DUMMY_RESPONSE;
    }
    return res.json();
}

export async function del(url, data) {
    let opts = {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };
    let res = await fetch(url, opts);
    if(res.status === 401){
        return LOGIN_EXPIRED;
    }
    if(res.status !== 200){
        return DUMMY_RESPONSE;
    }
    return res.json();
}

export async function post(url, data) {
    let opts = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };
    let res = await fetch(url, opts);
    console.log(res);
    if(res.status === 401){
        return LOGIN_EXPIRED;
    }
    if(res.status !== 200){
        return DUMMY_RESPONSE;
    }
    return res.json();
}

// 定义基础URL，如果没有配置REACT_APP_BASE_URL，则使用默认值'http://localhost:8080'
export const BASEURL = 'http://localhost:8080';
// 拼接API的前缀，即基础URL+'/api'
export const PREFIX = `${BASEURL}`;
// 定义一个常量，用于表示网络错误的响应
export const DUMMY_RESPONSE = {
    ok: false,
    message: "网络错误！"
}
export const LOGIN_EXPIRED = {
    ok: false,
    message: "登录已过期，请重新登录！"
}