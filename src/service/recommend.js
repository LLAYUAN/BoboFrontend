import { RECOMMENDPREFIX, getJson, post, get } from "./common";

export async function rank(tag) {
    let url = `${RECOMMENDPREFIX}/rank/${tag}`;
    return getJson(url);
}