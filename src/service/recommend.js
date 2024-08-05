import { RECOMMENDPREFIX, getJson, post, get } from "./common";

export async function rank(tag, page, size) {
    let url = `${RECOMMENDPREFIX}/rank/${tag}/${page}/${size}`;
    return getJson(url);
}
export async function getCount() {
    let url = `${RECOMMENDPREFIX}/rank/count`;
    return getJson(url);
}
export async function recommend() {
    let url = `${RECOMMENDPREFIX}/rank/recommend`;
    return getJson(url);
}