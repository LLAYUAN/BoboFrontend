import {USERPREFIX,getJson,post } from "./common";

// 获取个人主页的所有信息
export async function personalProfile() {
    let url = `${USERPREFIX}/personalProfile`;
    return getJson(url);
}

// 只获取个人信息
export async function getUserInfo() {
    let url = `${USERPREFIX}/getUserInfo`;
    return getJson(url);
}

// 只更改个人信息
export async function updateUserInfo(data) {
    let url = `${USERPREFIX}/updateUserInfo`;
    return post(url, data);
}

export async function follow(followeeID) {
    let url = `${USERPREFIX}/follow`;
    return post(url, {followeeID});
}

export async function unfollow(followeeID) {
    let url = `${USERPREFIX}/unfollow`;
    return post(url, {followeeID});
}

export async function startLive(name,tags,coverUrl) {
    let url = `${USERPREFIX}/startLive`;
    return post(url, {name, tags, coverUrl});
}

export async function visitInfo(userID) {
    let url = `${USERPREFIX}/visitInfo`;
    return post(url, {userID});

}

export async function createRoom(data) {
    let url = `${USERPREFIX}/createRoom`;
    return post(url, data);
}

export async function getRoomInfo() {
    let url = `${USERPREFIX}/getRoomInfo`;
    return getJson(url);

}