import {USERPREFIX,getJson,post} from "./common";

export async function getUserInfo() {
    let url = `${USERPREFIX}/getUserInfo`;
    return getJson(url);
}