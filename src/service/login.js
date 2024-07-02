import {postnoJson,USERPREFIX} from "./common";

export async function login(email, password) {
    const url = `${USERPREFIX}/login`;
    let result;
    try {
        result = await postnoJson(url, {email, password });
    } catch (e) {
        console.log(e);
        result = {
            ok: false,
            message: "网络错误！",
        }
    }
    console.log(result);
    return result;
    // return { status: 401, message: "Login failed" };
}

export async function register(email, password) {
    const url = `${USERPREFIX}/register`;
    let result;
    try {
        result = await postnoJson(url, {email,password});
    } catch (e) {
        console.log(e);
        result = {
            ok: false,
            message: "网络错误！",
        }
    }
    return result;
    // return { status: 401, message: "Register failed" };
}