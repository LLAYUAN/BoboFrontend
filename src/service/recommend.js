import { RECOMMENDPREFIX, getJson, post, get } from "./common";

export async function rank(tag) {
    let url = `${RECOMMENDPREFIX}/rank/${tag}`;
    return getJson(url);
}
export async function recommend() {
    let url = `${RECOMMENDPREFIX}/rank/recommend`;
    return getJson(url);
}