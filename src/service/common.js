/*
    credentials 是用于控制跨域请求中是否发送凭据（如 cookie、HTTP 认证等）的属性。它是一个布尔值属性，可以接受以下三种值：
    "omit"：不包含凭据信息，即不发送 cookie 等凭据。
    "same-origin"：仅在请求 URL 与调用脚本位于同一源时包含凭据。
"    include"：总是包含凭据，即始终发送 cookie 等凭据。
 */
export async function getJson(url) {
    let token = `${localStorage.getItem('tokenHead')}${localStorage.getItem('token')}`;

    let res = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
            "Authorization": token
        }
    });
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
    let token = `${localStorage.getItem('tokenHead')}${localStorage.getItem('token')}`;
    token = token.trim(); // 确保去除可能存在的多余空格或特殊字符
    let res = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
            "Authorization": token
        }
    });
    if(res.status === 401){
        return LOGIN_EXPIRED;
    }
    if(res.status !== 200){
        return DUMMY_RESPONSE;
    }
    return res;
}

export async function postnoToken(url, data) {
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
    console.log(res);
    return res.json();
}

export async function post(url, data) {
    let token = `${localStorage.getItem('tokenHead')}${localStorage.getItem('token')}`;
    let opts = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": token
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

// 定义基础URL，如果没有配置REACT_APP_BASE_URL，则使用默认值'http://localhost:8080'
export const BASEURL = 'http://localhost:9999';
// 拼接API的前缀，即基础URL+'/api'
export const PREFIX = `${BASEURL}`;
export const USERPREFIX = `${BASEURL}/user`;
// 定义一个常量，用于表示网络错误的响应
export const DUMMY_RESPONSE = {
    ok: false,
    message: "网络错误！"
}
export const LOGIN_EXPIRED = {
    ok: false,
    message: "登录已过期，请重新登录！"
}