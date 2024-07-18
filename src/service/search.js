import { RECOMMENDPREFIX, getJson, post, get } from "./common";

export async function search(query) {
    let url = `${RECOMMENDPREFIX}/searchForRoom?query=${query}`;
    return getJson(url);
}
